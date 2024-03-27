pipeline {
    agent any
    environment{
        DOCKER_TAG = getDockerTag()
        NEXUS_URL  = "172.31.34.232:8080"
        IMAGE_URL_WITH_TAG = "${NEXUS_URL}/node-app:${DOCKER_TAG}"
    }

    stages {
        stage('Build') {
            steps {
                git branch: 'main', url: 'https://github.com/HWHospital2024/HW_Hospital_App'
            }
        }

        stage('delete kube services') {
            steps {
            kubectl delete service hw-hospital-api-service
            kubectl delete deployment hw-hospital-api-deployment    
            }
        }
        
        stage('Remove Container') {
            steps {
                // Execute the shell script to remove the container
                script {
                    sh '''
                        #!/bin/bash

                        # Get the container ID of the container you want to remove
                        CONTAINER_ID=$(docker ps -aqf "ancestor=hw_hospital_api")

                        # Check if the container ID is not empty
                        if [ -n "$CONTAINER_ID" ]; then
                            # Remove the container
                            docker rm -f "$CONTAINER_ID"
                            echo "Container with ID $CONTAINER_ID removed successfully."
                        else
                            echo "No container found with the specified image."
                        fi
                    '''
                }
            }
        }
        
        stage('Remove Docker Images') {
            steps {
                script {
                    // Define the repository and tag of the image you want to remove
                    def repository = 'hw_hospital_api'
                    def tag = 'latest'

                    // Get the image ID of the specified repository and tag
                    def imageId = sh(script: "docker images -q ${repository}:${tag}", returnStdout: true).trim()

                    // Check if the image ID is not empty
                    if (imageId) {
                        // Remove the image
                        sh "docker rmi -f ${imageId}"
                        echo "Image ${repository}:${tag} with ID ${imageId} removed successfully."
                    } else {
                        echo "No image found with repository ${repository} and tag ${tag}."
                    }
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                // Install npm dependencies
                sh 'npm i'
                sh 'npm i chai@4'

                // Run Mocha Chai tests
                sh 'npm run test'
            }
        }
        
        stage('Docker build') {   
            steps {
                sh 'docker build . -t hr3000/hw_hospital_api:${DOCKER_TAG}'
            }
        }
        stage('Docker Hub Movement'){
            steps{
                   withCredentials([string(credentialsId: 'Dockerhub', variable: 'dockerHubPWD')]) {
                    sh "docker login -u hr3000 -p ${dockerHubPWD}"
                    sh "docker push hr3000/hw_hospital_api:${DOCKER_TAG}"
                    } 
            }
        }
        stage('Kube deployment'){
            steps{
                    sh "chmod +x changeTag.sh"
                    sh "./changeTag.sh ${DOCKER_TAG}"

                    sh "kubectl apply -f node-deployment.yml"
                    sh "kubectl apply -f service.yaml" 
            }
        }
    }
    post {
        failure {
            mail to: 'hwhr3000@gmail.com',
                 subject: "Pipeline failed: ${currentBuild.fullDisplayName}",
                 body: "The pipeline ${currentBuild.fullDisplayName} has failed. Please check Jenkins for more details."
        }
        // Clean after build
        always {
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                               [pattern: '.propsfile', type: 'EXCLUDE']])
        }
    }
    }
    
}

def getDockerTag(){
    def tag  = sh script: 'git rev-parse HEAD', returnStdout: true
    return tag
}
