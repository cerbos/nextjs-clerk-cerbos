
docker build . -t gcr.io/cerbos-playground/demo-express-clerk-cerbos-pdp:latest
docker push gcr.io/cerbos-playground/demo-express-clerk-cerbos-pdp:latest

gcloud --project cerbos-playground run deploy --platform managed --region us-east4 --image gcr.io/cerbos-playground/demo-express-clerk-cerbos-pdp:latest demo-express-clerk-cerbos-pdp