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
                sh 'sudo docker build -t hw_hospital_api .'
                sh 'sudo nohup docker run -p 3000:3000 hw_hospital_api &'
            }
        }
    }
}
