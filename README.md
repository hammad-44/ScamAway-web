# 🛡️ ScamAway – Say Goodbye to Scam & Phishing Websites

**ScamAway** is a powerful web-based platform that lets users check whether a website is legitimate or a scam/phishing attempt. By entering a URL, users receive real-time analysis backed by a **machine learning model trained on thousands of phishing and scam sites**, along with data from various security layers. 

The platform includes user authentication, scam reporting, contact support, and essential legal pages – all built with modern technologies like **Vite**, **React**, **TypeScript**, and **Firebase**.

![ScamAway Banner](https://your-image-url.com/banner.png) <!-- Optional: Add banner image -->

---

## 🌐 Live Demo

🚀 [Visit ScamAway](https://your-deployment-url.com) – Try out the live version now!

---

## ⚙️ Features

### 🔍 URL Safety Checker
- Analyze domain age, WHOIS data, SSL status, DNS records, and more.
- Identify common scam signals in real time.

### 🤖 ML-Powered Scam Detection
- URL analysis using a machine learning model trained on labeled phishing/scam datasets.
- Prediction results: ✅ Safe | ⚠️ Suspicious | ❌ Scam

### 🔐 Secure User Authentication
- Firebase Auth (Email/Password, Google Sign-In)
- Personalized dashboard and history

### 🛡️ Scam Reporting System
- Report suspicious URLs to improve the system.
- Admin moderation (optional)

### 📄 Informational Pages
- 📬 Contact Us
- 📝 Report a Scam
- 🔒 Privacy Policy
- 📃 Terms & Conditions
- ℹ️ About Page

---

## 🧠 How It Works

1. **User submits a website URL**
2. System performs:
   - Metadata checks (WHOIS, SSL, DNS)
   - Blacklist lookups
   - ML-based prediction
3. Returns a result with reasoning and indicators

---

## 🛠️ Tech Stack

| Technology        | Purpose                              |
|-------------------|--------------------------------------|
| Vite + React + TS | Frontend framework and tooling       |
| Firebase Auth     | Secure user authentication           |
| Firestore DB      | User data, reports, and history      |
| Python (ML Model) | Trained model for scam classification |
| Tailwind CSS      | Clean and responsive UI styling      |

---

## 📁 Project Structure

```
ScamAway/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Scan.tsx
│   │   ├── Report.tsx
│   │   ├── Contact.tsx
│   │   ├── Policy.tsx
│   │   └── Login/Signup.tsx
│   ├── services/
│   ├── firebase/
│   └── utils/
├── model/
│   └── scam_model.pkl
├── README.md
└── ...
```

---

## 📸 Screenshots

<!-- Replace with actual image URLs -->
![Home Page](https://your-image-url.com/home.png)
![Scan Result](https://your-image-url.com/result.png)
![Report Scam](https://your-image-url.com/report.png)

---

## 🧪 ML Model

- **Type**: Binary Classification (Scam or Legit)
- **Tech**: Trained in Python using Scikit-learn or TensorFlow
- **Features**: URL structure, domain age, keyword patterns, etc.
- **Integration**: Model is called via an API or hosted backend

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- Firebase project setup
- Python (for ML model if running locally)

### Installation

```bash
git clone https://github.com/yourusername/scamaway.git
cd scamaway
npm install
npm run dev
```

---

## 🔐 Firebase Setup

1. Create a Firebase project
2. Enable Authentication
3. Create Firestore database
4. Add your config to `firebaseConfig.ts`

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome! Please fork the repo and submit a pull request.

---

## 📄 License

MIT License – [View License](LICENSE)

---

## 👨‍💻 Developed By

**Hammad**  
🔗 [Portfolio](https://devhammad.vercel.app)  
🐦 [Twitter](https://twitter.com/)  
📫 [Email](mailto:your.email@example.com)

---

## 📢 Disclaimer

This tool provides assistance in detecting scam websites using statistical and ML methods but **does not guarantee 100% accuracy**. Always perform your own research and exercise caution online.
