# build stage
FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx tsc

# runtime stage
FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}

COPY --from=builder /app/dist/* ./
COPY --from=builder /app/node_modules ./node_modules

CMD ["updateUserStatus.lambda_handler"]
