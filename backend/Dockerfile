FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:18

COPY app/app.js package.json  ${LAMBDA_TASK_ROOT}/

RUN npm install

CMD ["app.lambda_handler"]
