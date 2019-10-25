# Cloud Run Example: Flatten PDFs for distribution

This a Cloud Run example including Cloud Build. It accompanies my [blog post](https://blog.hypescaler.com/003-containers-cloud-run/).

## Setup

```

gcloud auth login

# WARNING: This takes the first billing account from your list. Change accordingly in the script if needed.

./setup.sh ${PROJECT_ID}

```

## Cloud Build & Run it

```
gcloud builds submit --config cloudbuild.yaml .
```


If you want to pull the image locally:

```
gcloud auth configure-docker
docker pull gcr.io/${PROJECT_ID}/pdfdist
```

## Security Scanning

We enabled security scanning by adding the GCP API `containerscanning.googleapis.com` during setup. To check for issues:

```
gcloud beta container images list-tags --show-occurrences gcr.io/${PROJECT_ID}/pdfdist

gcloud beta container images describe gcr.io/${PROJECT_ID}/pdfdist@sha256:<image_hash>
```

# Using $YOUR_DOMAIN

```
export YOUR_DOMAIN=<choose>

gcloud domains verify ${YOUR_DOMAIN}

gcloud beta run domain-mappings create --service pdfdist --domain pdfdist.${YOUR_DOMAIN} --platform managed --region us-central1

# Check when it's up

gcloud beta run domain-mappings describe --domain pdfdist.${YOUR_DOMAIN} --platform managed --region us-central1

```

## Set up build triggers

Via CLI, it didn't work at the time of writing - follow [this issue](https://github.com/GoogleCloudPlatform/cloud-builders/issues/99). Some day, it might work like this:

```
gcloud alpha builds triggers create github --repo_name=github_${OWNER_NAME}_${REPO_NAME} --repo_owner=${OWNER_NAME} --branch_pattern=^master$ --build_config=cloudbuild.yaml
```

You can do it via the UI though, as described in the [Cloud Run tutorial](https://cloud.google.com/run/docs/continuous-deployment).





