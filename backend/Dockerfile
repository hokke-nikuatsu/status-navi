FROM node:18 AS builder

WORKDIR /app

COPY app/updateUserStatus.ts package.json tsconfig.json ./

RUN npm install && npx tsc

FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}

COPY --from=builder /app/dist/updateUserStatus.js ./updateUserStatus.js
COPY --from=builder /app/node_modules ./node_modules

CMD ["updateUserStatus.lambda_handler"]
