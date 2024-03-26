pipeline {
    agent {
        label 'ubuntu' // Specify the label of the slave node
    }
    stages {
        stage('Build') {
            steps {
                git branch: 'main', url: 'https://github.com/HWHospital2024/HW_Hospital_App'
            }
        }
 stages {
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
                            docker rm "$CONTAINER_ID"
                            echo "Container with ID $CONTAINER_ID removed successfully."
                        else
                            echo "No container found with the specified image."
                        fi
                    '''
                }
            }
        }
    }        
stages {
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
                        sh "docker rmi ${imageId}"
                        echo "Image ${repository}:${tag} with ID ${imageId} removed successfully."
                    } else {
                        echo "No image found with repository ${repository} and tag ${tag}."
                    }
                }
            }
        }
    }
        
        stage('Docker build') {   
            steps{
                sh 'sudo docker build -t hw_hospital_api .'
                sh 'sudo nohup docker run -p 3000:3000 hw_hospital_api &'
            }
        }
        }
    }

