def frontendImage
def backendImage
pipeline {
    agent any
    stages {

        stage('Build Test') { 
            steps {
                echo 'hello World!!'
            }
        }

        
        stage('Build Frontend Image') { 
            steps {
                script {
                    docker.withRegistry('', 'Dockerhub') {
                        frontendImage = docker.build("omarlaz/frontend")
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
                            subject: "ERROR CI In ${env.STAGE_NAME}: Project name -> ${env.JOB_NAME}",
                            to: 'jenkinsproject51@gmail.com'
                }
            }
        }

        stage('Rollout FrontEnd Deployment') {
            steps {
                withKubeConfig([credentialsId: 'apiserver', serverUrl: 'https://54.90.228.154:8443/']) {
                    sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"'  
                    sh 'chmod u+x ./kubectl'
                    sh './kubectl rollout restart deployment/client-deployment'
                }
            }
        } 

    }    
}