pipeline {
  agent {
    docker {
      image 'node:8'
      args '-p 3000:3000'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Deploy') {
      steps {
        sh 'bash post-deploy.sh $BUILD_ID'
      }
    }

  }
  environment {
    CI = 'true'
  }
}