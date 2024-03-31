pipeline {
    agent any
    environment{
        DOCKER_TAG = getDockerTag()
    }

    stages {
        stage('Pipeline Info') {
                 steps {
                     script {
                         echo """
                         The current Zap configuration:
                             Scan Type: APIS
                             Target: http://ab2240c2ab1f74a62abad9870a7a7777-2073886997.us-east-1.elb.amazonaws.com
                             Generate report: false
                         """
                     }
                 }
         }    
        stage('Build') {
            steps {
                git branch: 'main', url: 'https://github.com/HWHospital2024/HW_Hospital_App'
            }
        }
        
        stage('Remove existing object') {
            steps {
                script {
                    // Define the repository and tag of the image you want to remove
                    def repository = 'hw_hospital_api'
                    def tag = 'latest'

                    // Get the image ID of the specified repository and tag
                    def imageId = sh(script: "docker images -q ${repository}:${tag}", returnStdout: true).trim()

                    echo "Program started for removing existing docker image"
                    // Check if the image ID is not empty
                    if (imageId) {
                        // Remove the image
                        sh "docker rmi -f ${imageId}"
                        echo "Image ${repository}:${tag} with ID ${imageId} removed successfully."
                    } else {
                        echo "No image found with repository ${repository} and tag ${tag}."
                    }

                    echo "Docker image removed"
                }
            }
        }
        
      stage('Run Tests') {
            steps {
                // Install npm dependencies
                echo "Automated test started"
                echo "npm initialized"
                sh 'npm i'
                sh 'npm i chai@4'

                // Run Mocha Chai tests
                echo "Mocha Chai test started"
                sh 'npm run test'
                echo "Mocha Chai test completed"
            }
      }
        
        stage('Setting up Docker build') {   
            steps {
                sh 'docker build . -t hr3000/hw_hospital_api:${DOCKER_TAG}'
                echo "Docker Container hr3000/hw_hospital_api:${DOCKER_TAG} build completed"

            }
        }

        stage('Scanning target on owasp container'){
            steps{
                script {
                    sh '''
                        echo "Pulling up last OWASP ZAP container --> Start"
                        docker pull owasp/zap2docker-stable
                        echo "Pulling up last VMS container --> End"
                        echo "Starting container --> Start"
                        echo "Running owasp docker"
                        docker run -dt --name owasp owasp/zap2docker-stable /bin/bash
                        echo "Scan Execution started"
                        output=$(docker exec owasp zap-api-scan.py -t http://ab2240c2ab1f74a62abad9870a7a7777-2073886997.us-east-1.elb.amazonaws.com -f openapi  || true)

                        fail_new_count=$(echo "$output" | grep -o 'FAIL-NEW: [0-9]*' | awk '{print $2}')
                        fail_inprog_count=$(echo "$output" | grep -o 'FAIL-INPROG: [0-9]*' | awk '{print $2}')
                        echo "$output"
                        echo "$fail_new_count"
                        echo "$fail_inprog_count"

                        if [[ $fail_new_count -gt 0 || $fail_inprog_count -gt 0 ]]; then
                            exit 1
                        else
                            echo "Scanning has completed successfully"
                        fi

                        echo "Test execution completed"
                        docker stop owasp
                        docker rm owasp
                        echo "OWASP ZAP Docker image removed successfully."
                    '''                  
                }
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
            echo "Removing container"
            sh '''
                docker stop owasp
                docker rm owasp
            '''                                   
        }
    }
}

def getDockerTag(){
    def tag  = sh script: 'git rev-parse HEAD', returnStdout: true
    return tag
}
