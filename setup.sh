set -e
set -u

PROJECT_ID=$1

gcloud projects create ${PROJECT_ID} --set-as-default

# Set billing. WARNING: This takes the first billing account from your list. Change accordingly.

gcloud alpha billing projects link ${PROJECT_ID} --billing-account $(gcloud alpha billing accounts list --limit=1 --format='value(name.basename())')

# Activate the required GCP APIs

gcloud services enable cloudbuild.googleapis.com run.googleapis.com containerregistry.googleapis.com containerscanning.googleapis.com

# Check if they are really activated

gcloud services list --enabled

# Give the Cloud Build service account the roles to be able to deploy to Cloud Run

account=$(gcloud projects get-iam-policy $PROJECT_ID --flatten="bindings[].members" --format="value(bindings.members)" --filter="bindings.role:roles/cloudbuild.builds.builder");gcloud projects add-iam-policy-binding ${PROJECT_ID} --member=$account --role=roles/run.admin;gcloud projects add-iam-policy-binding ${PROJECT_ID} --member=$account --role=roles/iam.serviceAccountUser