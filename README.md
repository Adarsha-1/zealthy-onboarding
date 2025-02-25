# Zealthy - Custom Onboarding Flow

This is a **full-stack onboarding flow application** built for the Zealthy coding exercise. The application consists of:
1. **User Onboarding Section** - A multi-step form that allows users to sign up and enter additional details.
2. **Admin Section** - A panel where admins can configure which fields appear on which onboarding page.
3. **Data Table Section** - A publicly accessible table displaying stored user data.

The project is built with **React (frontend)** and **Flask with SQLite/PostgreSQL (backend)**.

---

## **Tech Stack & Reasoning**
| Component      | Technology       | Reason for Choosing |
|---------------|-----------------|---------------------|
| **Frontend**  | React.js         | Popular, component-based UI framework with strong community support. |
| **Backend**   | Flask (Python)   | Lightweight and efficient for rapid API development. |
| **Database**  | SQLite (local), PostgreSQL (cloud) | SQLite for local development, PostgreSQL for cloud scalability. |
| **State Mgmt**| React Context API | Lightweight and sufficient for managing form state across pages. |
| **Deployment**| Netlify (Frontend), Render (Backend) | Easy and scalable cloud deployment solutions. |

---

## **Live Demo**
🔗 **Frontend**: https://zealthy-adarsha.netlify.app/

---
## **Project Structure**
```plaintext
zealthy-onboarding/
│── backend/                 # Flask backend
│   │── app.py               # Main Flask app
│   │── models.py            # Database schema
│   │── routes.py            # API endpoints
│   └── requirements.txt     # Backend dependencies
│
│── frontend/                # React frontend
│   │── src/
|   |   │── Api/             # API calls to backend
│   │   │── components/      # Reusable UI components
│   │   │── styles/          # Onboarding, Admin, and Data Table pages
│   │── App.js               # Main app entry
│   └── package.json         # Frontend dependencies
│
│── README.md                # Documentation
│── .gitignore               # Ignore unnecessary files

```
---

## **Installation & Setup**
### **1. Clone the Repository**

git clone https://github.com/yourusername/zealthy-onboarding.git
cd zealthy-onboarding

---




