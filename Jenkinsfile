def frontendImage
def backendImage
pipeline {
    agent any
    stages {

        stage('Build Frontend Development Image') { 
            steps {
                script {
                    docker.withRegistry('', 'Dockerhub') {
                        frontendImage = docker.build("omarlaz/frontend:dev", "-f Dockerfile.dev .")
                    }
                } 
            }

            post {
                success {
                    echo 'Frontend image was built successfully!!'

                }
                failure {
                    emailext body: "<b>Example</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> Build URL: ${env.BUILD_URL} <br> Stage Name: ${env.STAGE_NAME}",
                            mimeType: 'text/html',
                            subject: "ERROR CI In ${env.STAGE_NAME}: Project name -> ${env.JOB_NAME}",
                            to: 'jenkinsproject51@gmail.com'
                }
            }
        }

        stage('Unit Testing Frontend Development Image') {
            steps {
                sh "docker run -e CI=true omarlaz/frontend:dev npm test"
            }

            post {
                success {
                    echo 'Unit tests of the frontend development image passed successfully!!'

                }
                failure {
                    emailext body: "<b>Example</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> Build URL: ${env.BUILD_URL} <br> Stage Name: ${env.STAGE_NAME}",
                            mimeType: 'text/html',
                            subject: "ERROR CI In ${env.STAGE_NAME}: Project name test -> ${env.JOB_NAME}",
                            to: 'jenkinsproject51@gmail.com'
                }
            }
        }




                
        stage('Push Frontend Image') { 
            steps {
                script {
                    docker.withRegistry('', 'Dockerhub') {
                        frontendImage.push()
                    }
                } 
            }

            post {
                success {
                    echo 'Pushed frontend image successfully!!'

                }
                failure {
                    emailext body: "<b>Example</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> Build URL: ${env.BUILD_URL} <br> Stage Name: ${env.STAGE_NAME}",
                            mimeType: 'text/html',
                            subject: "ERROR CI In ${env.STAGE_NAME}: Project name test -> ${env.JOB_NAME}",
                            to: 'jenkinsproject51@gmail.com'
                }
            }
        }
    }    
}