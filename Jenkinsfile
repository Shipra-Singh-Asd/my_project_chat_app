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
                    sh 'cd server && npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'cd client && npm test -- --watchAll=false'
                    sh 'cd server && npm test -- --watchAll=false'
                }
            }
        }

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
                    sh "docker build -t ${CLIENT_IMAGE}:${IMAGE_TAG} ./client"
                    sh "docker build -t ${SERVER_IMAGE}:${IMAGE_TAG} ./server"
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh "docker stop ${CLIENT_CONTAINER} || true && docker rm ${CLIENT_CONTAINER} || true"
                    sh "docker stop ${SERVER_CONTAINER} || true && docker rm ${SERVER_CONTAINER} || true"
                    sh "docker network create my_network || true"
                    sh "docker run -d --network=my_network -p 3000:3000 --name ${CLIENT_CONTAINER} ${CLIENT_IMAGE}:${IMAGE_TAG}"
                    sh "docker run -d --network=my_network -p 5000:5000 --name ${SERVER_CONTAINER} ${SERVER_IMAGE}:${IMAGE_TAG}"
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
