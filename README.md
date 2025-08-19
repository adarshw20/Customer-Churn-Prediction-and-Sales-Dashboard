# Customer Churn Prediction & Sales Dashboard

A Streamlit-powered interactive dashboard for customer churn prediction and sales trend analysis, combining machine learning models with rich data visualizations to provide actionable business insights.

-----

## 🚀 Features

### 🔮 Churn Prediction

  * **Models Supported:** Logistic Regression, Random Forest
  * **Performance Metrics:** Accuracy, Precision, Recall, F1-Score comparison
  * **Feature Engineering:** Automated preprocessing, scaling, and encoding
  * **Model Insights:** Feature importance analysis

### 📊 Sales Trend Analysis

  * **Time Series Visualization:** Daily, monthly, and quarterly trends
  * **Growth Analysis:** Month-over-month revenue growth
  * **Revenue vs. Churn:** Correlation insights between churn rate and sales
  * **Interactive Charts:** Powered by Plotly for smooth exploration

### 👥 Customer Segmentation

  * **K-Means Clustering:** Automated customer segmentation
  * **Segment Categories:** High Value, Medium Value, Low Value, At Risk
  * **Revenue Insights:** Contribution by customer segment
  * **Churn Profiling:** Churn probability across segments

### 🎛️ Interactive Dashboard

  * **Filters:** Date range, risk level, contract type
  * **Responsive UI:** Professional design, optimized for desktop & mobile
  * **Export Options:** Download results and reports
  * **User Friendly:** Clean layout with intuitive navigation

-----

## 🛠️ Technology Stack

### Data & Machine Learning

  * **Python:** Core programming language
  * **Pandas / NumPy:** Data processing
  * **Scikit-learn:** ML models (Logistic Regression, Random Forest, K-Means)
  * **StandardScaler:** Feature normalization

### Visualization

  * **Streamlit:** Web app framework
  * **Plotly:** Interactive, dynamic charts
  * **Seaborn / Matplotlib:** Additional plotting capabilities

-----

## 📂 Data Structure

### Customer Data

  * `customer_id` → Unique identifier
  * `age` → Customer age
  * `tenure` → Subscription length (months)
  * `monthly_charges` → Monthly billing amount
  * `total_charges` → Lifetime customer value
  * `contract_type` → Subscription plan
  * `payment_method` → Preferred payment mode
  * `internet_service` → Type of internet service
  * `support_tickets` → No. of support interactions
  * `last_activity_days` → Days since last engagement
  * `churn_probability` → Predicted churn risk (0–1)

### Sales Data

  * `date` → Transaction date
  * `sales` → Daily sales revenue
  * `transactions` → No. of transactions

-----

## 📈 Key Metrics

### Business KPIs

  * **Total Customers:** Current customer base size
  * **Average Churn Risk:** Mean churn probability across customers
  * **Monthly Revenue:** Total recurring revenue
  * **High-Risk Customers:** Customers with \>60% churn probability

### Model Performance

  * **Accuracy:** Overall prediction correctness
  * **Precision:** Reliability of churn predictions
  * **Recall:** Sensitivity to actual churn cases
  * **F1-Score:** Balance between precision & recall

-----

## ⚡ Installation & Setup

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd customer-churn-dashboard
    ```

2.  **Install dependencies**

    ```bash
    pip install -r requirements.txt
    ```

3.  **Run the Streamlit app**

    ```bash
    streamlit run streamlit_dashboard.py
    ```

4.  **Open the dashboard**
    Visit → `http://localhost:8501`

-----

## 📖 Usage Guide

1.  **Overview Dashboard:** View KPIs, trends, and risk distribution
2.  **Churn Prediction:** Analyze churn probability distribution, check feature importance, and model results
3.  **Sales Analysis:** Explore daily/monthly sales trends, and track growth rates and transaction volumes
4.  **Customer Insights:** Segment customers via clustering and compare revenue and churn risk by group
5.  **ML Models:** Compare performance metrics and understand model strengths & weaknesses

-----

## 🔧 Customization

### Adding New Models

```python
models['XGBoost'] = XGBClassifier(random_state=42)
models['Neural Network'] = MLPClassifier(random_state=42)
```

### Adding New Features

```python
feature_cols.extend(['new_feature_1', 'new_feature_2'])
```

### Styling

Modify CSS inside `st.markdown()` for UI customization.

-----

## ⚙️ Performance Optimization

  * **Caching:** `@st.cache_data` for heavy operations
  * **Vectorized Processing:** Pandas/Numpy for efficiency
  * **Lazy Loading:** Render charts only when needed
  * **Memory Management:** Optimize data types

-----

## 🔮 Future Enhancements

  * Real-time data integration (databases, APIs)
  * Advanced ML models (XGBoost, Neural Networks, Deep Learning)
  * A/B testing for marketing campaigns
  * Automated alerts & notifications
  * REST API for external integrations

-----

## 🤝 Contributing

1.  Fork the repo
2.  Create a feature branch
3.  Make changes & add tests
4.  Submit a pull request

-----

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

-----

## 💬 Support

For questions, feedback, or issues, please open an issue in the repository or contact the development team.

Built with ❤️ using Streamlit, Python & Machine Learning
