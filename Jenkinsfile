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
        stage('Docker build') {
            steps {
                script {
                    // Define the Docker image name and tag
                    def imageName = "hw_hospital_api"
                    def imageTag = "latest" // or specify your desired tag
                    
                    // Check if the Docker image exists
                    def existingImage = sh(script: "sudo docker images -q ${imageName}:${imageTag}", returnStdout: true).trim()
                    
                    if (existingImage) {
                        echo "Found existing image: ${existingImage}. Removing it..."
                        
                        // Stop and remove the existing Docker container
                        sh "sudo docker stop ${imageName} || true"
                        sh "sudo docker rm ${imageName} || true"
                        
                        // Remove the existing Docker image
                        sh "sudo docker rmi ${imageName}:${imageTag}"
                    } else {
                        echo "No existing image found with the name: ${imageName}:${imageTag}"
                    }
                }
                
                sh 'sudo docker build -t hw_hospital_api .'
                sh 'sudo nohup docker run -p 3000:3000 hw_hospital_api &'
            }
        }
    }
}
