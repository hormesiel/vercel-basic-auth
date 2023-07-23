# node
TEST_URL=https://vercel-basic-auth-node.vercel.app TEST_VARIANT=no-credentials yarn run jest
TEST_URL=https://vercel-basic-auth-node.vercel.app TEST_VARIANT=invalid-credentials yarn run jest
TEST_URL=https://vercel-basic-auth-node.vercel.app TEST_VARIANT=valid-credentials yarn run jest

# node-express
TEST_URL=https://vercel-basic-auth-node-express.vercel.app TEST_VARIANT=no-credentials yarn run jest
TEST_URL=https://vercel-basic-auth-node-express.vercel.app TEST_VARIANT=invalid-credentials yarn run jest
TEST_URL=https://vercel-basic-auth-node-express.vercel.app TEST_VARIANT=valid-credentials yarn run jest

# node-static-auth
TEST_URL=https://vercel-basic-auth-node-static-auth.vercel.app TEST_VARIANT=no-credentials yarn run jest
TEST_URL=https://vercel-basic-auth-node-static-auth.vercel.app TEST_VARIANT=invalid-credentials yarn run jest
TEST_URL=https://vercel-basic-auth-node-static-auth.vercel.app TEST_VARIANT=valid-credentials yarn run jest

# vercel-json
TEST_URL=https://vercel-basic-auth-vercel-json.vercel.app TEST_VARIANT=no-credentials yarn run jest
TEST_URL=https://vercel-basic-auth-vercel-json.vercel.app TEST_VARIANT=invalid-credentials yarn run jest
TEST_URL=https://vercel-basic-auth-vercel-json.vercel.app TEST_VARIANT=valid-credentials yarn run jest