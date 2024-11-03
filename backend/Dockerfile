FROM node:18 AS builder

WORKDIR /app

COPY app/app.ts package.json tsconfig.json ./

RUN npm install && npx tsc

FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}

COPY --from=builder /app/dist/app.js ./app.js
COPY --from=builder /app/node_modules ./node_modules

CMD ["app.lambda_handler"]
