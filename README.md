# Oracle Auto-Retry

Automatically retries creating **Oracle Cloud** instances when the desired shape is temporarily out of capacity.  
Ideal for hard-to-get shapes like `VM.Standard.AI.Flex` with 6GB, running directly in your browser console **after inspecting the Create button**.

---

## 🎥 Demo

Below is a demo showing the script in action.

> ⚠️ The retry interval in this demo is set to **5 seconds** for demonstration.  
> For real use, set it between **70–90 seconds** to avoid Oracle Cloud rate limits.

https://github.com/user-attachments/assets/eabcb866-e4a3-40f1-8790-ee255d5f40ae

---

## 🚀 How to Use

1. Open the [Oracle Cloud Console](https://cloud.oracle.com/compute/instances), click _"Create Instance"_, and fill out the instance creation form until the **"Create" button appears**.
2. **Inspect the "Create" button** using Developer Tools (right-click → Inspect).
3. **Run the script in the console only after inspecting the button**. It won’t work if the button isn’t visible in the DOM.

The script will automatically click **Create** until the instance is created or you stop it.

---

## 🛡️ Console Filter Tip

All script logs use the `[ORACLE-RETRY]` prefix.  
To avoid alerts or CORS messages from Oracle Cloud, **filter by `ORACLE-RETRY`** in the console:

-   Open console → click "Filter" → type `ORACLE-RETRY`
-   Only script messages will appear, keeping the console clean.

---

## ⚙️ Useful Commands

-   `stopRetry()` → Stop automatic retries
-   `changeInterval(seconds)` → Change retry interval (in seconds)

Example:

```js
changeInterval(30); // retries every 30 seconds
stopRetry(); // stops retrying
```
