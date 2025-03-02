pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-react-app"
        IMAGE_TAG = "latest"
        CONTAINER_NAME = "react-container"
        SONARQUBE_URL = "http://localhost:9000"  // Update based on your SonarQube setup
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://your-repo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('client') {
                    sh 'npm install'
                }
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Client') {
            steps {
                dir('client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Server') {
            steps {
                dir('server') {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t my-client-image:latest ./client'
                sh 'docker build -t my-server-image:latest ./server'
            }
        }

        stage('Run Docker Containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
