# Security Setup Guide

## Important: Before Pushing to GitHub

Your sensitive data (API keys, database passwords) are now protected from being uploaded to GitHub.

## What Has Been Done

1. ✅ **Stripe API key** moved from code to configuration file
2. ✅ **application.properties** added to `.gitignore` (won't be uploaded to GitHub)
3. ✅ **application.properties.example** created as a template for others

## What You Need to Do

### Before Your First Push

Since `application.properties` is now in `.gitignore`, you need to remove it from Git history if you've already committed it:

```bash
# Remove the file from Git history (but keep it locally)
git rm --cached backend/src/main/resources/application.properties

# Commit the changes
git add .gitignore
git add backend/src/main/resources/application.properties.example
git add backend/src/main/java/com/hotelmanagement/client/StripeClient.java
git commit -m "Security: Move sensitive data to configuration files"

# Now push safely
git push origin main
```

### For New Developers

When someone clones your repository, they should:

1. Copy the example file:
   ```bash
   cp backend/src/main/resources/application.properties.example backend/src/main/resources/application.properties
   ```

2. Edit `application.properties` with their own values:
   - Database username and password
   - Stripe API key
   - Upload directory path
   - Admin credentials

## Files That Are Protected

These files are now in `.gitignore` and won't be uploaded:

- `backend/src/main/resources/application.properties` - Contains all sensitive data
- `.env` and `*.env` files
- `uploads/` - User uploaded files

## Files That Will Be Uploaded

- `backend/src/main/resources/application.properties.example` - Template without sensitive data
- All source code files
- `README.md` and documentation

## Current Sensitive Data in application.properties

Your `application.properties` currently contains:

- ✅ **Stripe API Key**: Protected (will not be uploaded)
- ✅ **Database Password**: Protected (will not be uploaded)
- ⚠️ **Admin Password**: Consider using a stronger password in production

## Best Practices

1. **Never commit** `application.properties` with real credentials
2. **Always use** environment variables for production deployments
3. **Rotate keys** if you accidentally pushed them to GitHub
4. **Use different keys** for development and production

## If You Already Pushed Sensitive Data

If you already pushed your Stripe key to GitHub:

1. **Immediately revoke** the exposed key in Stripe Dashboard
2. **Generate a new key** at https://dashboard.stripe.com/apikeys
3. **Update** your local `application.properties` with the new key
4. **Clean Git history** using the commands above

## Testing

After making these changes, verify:

```bash
# Check what will be committed
git status

# Verify application.properties is NOT listed
# If it appears, run: git rm --cached backend/src/main/resources/application.properties
```

Your application will work the same way, but now your secrets are safe! 🔒
