
# Omega CV

AI tool that transforms informal input into professional CV-ready ability statements.

**Live demo:**  
https://omega-cv.vercel.app/

---

## What it does

Omega CV takes simple or messy text and converts it into a clear, professional sentence suitable for a CV or LinkedIn profile.

---

## Example

**Input**
```
I play games all the time and don't do my homework.
```

**Output**
```
Applies strategic thinking and problem-solving skills developed through interactive and fast-paced environments.
```
---

## Tech Stack

- HTML, CSS, JavaScript  
- Python (serverless API call)  
- Google Gemini API  
- Vercel

---

## Setup

Omega CV is deployed as part of the Omega hub (see the root `README.md`) and is served under `/cv/`.
Its serverless function lives in the repository root at `api/generate.py`, because Vercel only detects functions there.

1. Create a Gemini API key
2. Add it as `GEMINI_API_KEY` to the environment variables of the hub's Vercel project
3. Optional: set `GEMINI_MODEL` (default `gemini-2.5-flash`)

---

## Notes

- API key is handled server-side  
- No frameworks used  
- Output quality depends on the model  
