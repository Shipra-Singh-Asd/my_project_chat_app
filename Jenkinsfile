pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-react-app"
        IMAGE_TAG = "latest"
        CONTAINER_NAME = "react-container"
        SONARQUBE_URL = "http://localhost:9000"  // Update based on your SonarQube setup
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Shipra-Singh-Asd/my_project_chat_app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'cd client && npm install'
                }
            }
        }

        // stage('Run Tests') {
        //     steps {
        //         script {
        //             sh 'npm test -- --watchAll=false'
        //         }
        //     }
        // }

        // stage('Code Analysis with SonarQube') {
        //     steps {
        //         script {
        //             withSonarQubeEnv('sq1') {  // Ensure SonarQube is configured in Jenkins
        //                 sh 'cd client && npm run sonar'  // Make sure SonarQube is set up in package.json
        //             }
        //         }
        //     }
        // }

        stage('Build React App') {
            steps {
                script {
                    sh 'cd client && npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                    sh "docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
