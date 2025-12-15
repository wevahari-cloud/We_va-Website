# Vercel Deployment Guide

## Required Environment Variables

Add these to your Vercel project settings:

```bash
# Database
DATABASE_URL=postgresql://neondb_owner:npg_KiHkJ9Evhx6C@ep-patient-band-aht7biyv-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require

# NextAuth (if using authentication)
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://your-domain.vercel.app
```

## Deployment Steps

1. **Push to GitHub** (already done)
2. **Add Environment Variable** in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add `DATABASE_URL` with the connection string above
3. **Redeploy** from Vercel Dashboard or push a new commit

## Initial Setup After Deployment

1. Visit `/admin/login`
2. Login with your credentials
3. Go to **Admin → Home Page**
4. Fill in all content (Hero, Stats, President's Message)
5. Click **Save**

Your website will now be live with all content!
