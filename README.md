

gcloud auth login
gcloud config set project sensei-f7eaa
gcloud builds submit --config cloudbuild.yaml .

gcloud beta run deploy pdfdist --image gcr.io/sensei-f7eaa/pdfdist --platform managed --region us-central1 --memory 1Gi

docker pull gcr.io/sensei-f7eaa/pdfdist

https://pdfdist-eptzynv6zq-uc.a.run.app

docker build -t pdfdist .

docker run --rm -i pdfdist

gcloud domains verify hypescaler.com

gcloud beta run domain-mappings create --service pdfdist --domain pdf.hypescaler.com --platform managed --region us-central1

gcloud beta run domain-mappings describe --domain pdf.hypescaler.com --platform managed --region us-central1

https://cloud.google.com/run/docs/continuous-deployment