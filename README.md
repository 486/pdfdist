# Cloud Run Example: Flatten PDFs for distribution

This a Cloud Run example including Cloud Build. It accompanies my [blog post](https://blog.hypescaler.com).

## Setup

```
export PROJECT_ID=<choose>

gcloud auth login

gcloud projects create ${PROJECT_ID} --set-as-default

# Set billing. WARNING: This takes the first billing account from your list. Change accordingly.

gcloud alpha billing projects link ${PROJECT_ID} --billing-account $(gcloud alpha billing accounts list --limit=1 --format='value(name.basename())')

# Activate the required GCP APIs

gcloud services enable cloudbuild.googleapis.com run.googleapis.com containerregistry.googleapis.com

# Check if they are really activated

gcloud services list --enabled

# Give the Cloud Build service account the roles to be able to deploy to Cloud Run

account=$(gcloud projects get-iam-policy $PROJECT_ID --flatten="bindings[].members" --format="value(bindings.members)" --filter="bindings.role:roles/cloudbuild.builds.builder");gcloud projects add-iam-policy-binding ${PROJECT_ID} --member=$account --role=roles/run.admin;gcloud projects add-iam-policy-binding ${PROJECT_ID} --member=$account --role=roles/iam.serviceAccountUser
```

## Cloud Build it

```
gcloud builds submit --config cloudbuild.yaml .
```


If you want to pull the image locally:

```
gcloud auth configure-docker
docker pull gcr.io/${PROJECT_ID}/pdfdist
```

## Cloud Run it

```
gcloud beta run deploy pdfdist --image gcr.io/${PROJECT_ID}/pdfdist --platform managed --region us-central1 --memory 1Gi
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





