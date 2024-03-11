pipeline {
    agent any

    environment {
        DOCKER_IMAGE    = 'fern018/github-webhook:latest'
        REMOTE_HOST     = 'g64070018@34.87.96.185'
        SSH_CREDENTIALS = 'ssh-prod_instance'
    }

    stages {
        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USER')]) {
                    sh 'echo $DOCKERHUB_PASSWORD | docker login --username $DOCKERHUB_USER --password-stdin'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Run Docker on Remote Server') {
            steps {
                sshagent([SSH_CREDENTIALS]) {
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_HOST 'docker stop \$(docker ps -a -q) || true'"
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_HOST 'docker rm \$(docker ps -a -q) || true'"
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_HOST 'docker rmi \$(docker images -q) || true'"
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_HOST 'docker run -d --name github-webhook -p 8085:80 $DOCKER_IMAGE'"
                    sh "ssh -o StrictHostKeyChecking=no $REMOTE_HOST 'docker ps -a'"
                }
            }
        }
    }
}