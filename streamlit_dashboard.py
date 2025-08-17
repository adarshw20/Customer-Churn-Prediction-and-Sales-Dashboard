import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.cluster import KMeans
import warnings
warnings.filterwarnings('ignore')

# Page configuration
st.set_page_config(
    page_title="Customer Churn Prediction Dashboard",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        font-weight: bold;
        color: #1f2937;
        text-align: center;
        margin-bottom: 2rem;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    .metric-card {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        border-left: 4px solid #3b82f6;
    }
    
    .sidebar-header {
        font-size: 1.5rem;
        font-weight: bold;
        color: #374151;
        margin-bottom: 1rem;
    }
    
    .stSelectbox > div > div {
        background-color: #f8fafc;
    }
</style>
""", unsafe_allow_html=True)

# Generate mock data
@st.cache_data
def generate_mock_data():
    np.random.seed(42)
    
    # Customer data
    n_customers = 1000
    customer_data = {
        'customer_id': range(1, n_customers + 1),
        'age': np.random.randint(18, 70, n_customers),
        'tenure': np.random.randint(1, 60, n_customers),
        'monthly_charges': np.random.uniform(20, 150, n_customers),
        'total_charges': np.random.uniform(100, 8000, n_customers),
        'contract_type': np.random.choice(['Month-to-month', 'One year', 'Two year'], n_customers),
        'payment_method': np.random.choice(['Electronic check', 'Mailed check', 'Bank transfer', 'Credit card'], n_customers),
        'internet_service': np.random.choice(['DSL', 'Fiber optic', 'No'], n_customers),
        'support_tickets': np.random.randint(0, 10, n_customers),
        'last_activity_days': np.random.randint(0, 90, n_customers)
    }
    
    # Create churn probability based on features
    churn_prob = (
        (customer_data['support_tickets'] * 0.1) +
        (customer_data['last_activity_days'] * 0.01) +
        (1 / (customer_data['tenure'] + 1)) * 0.5 +
        np.random.normal(0, 0.1, n_customers)
    )
    churn_prob = np.clip(churn_prob, 0, 1)
    customer_data['churn_probability'] = churn_prob
    customer_data['churn'] = (churn_prob > 0.5).astype(int)
    
    # Add customer names
    first_names = ['John', 'Sarah', 'Mike', 'Emily', 'Alex', 'Jessica', 'David', 'Lisa', 'Chris', 'Amanda']
    last_names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
    customer_data['customer_name'] = [
        f"{np.random.choice(first_names)} {np.random.choice(last_names)}" 
        for _ in range(n_customers)
    ]
    
    customers_df = pd.DataFrame(customer_data)
    
    # Sales data
    dates = pd.date_range('2023-01-01', '2024-12-31', freq='D')
    sales_data = {
        'date': dates,
        'sales': np.random.uniform(10000, 50000, len(dates)) + 
                np.sin(np.arange(len(dates)) * 2 * np.pi / 365) * 5000,  # Seasonal pattern
        'transactions': np.random.randint(100, 500, len(dates))
    }
    sales_df = pd.DataFrame(sales_data)
    
    return customers_df, sales_df

# Load data
customers_df, sales_df = generate_mock_data()

# Sidebar
st.sidebar.markdown('<div class="sidebar-header">🎛️ Dashboard Controls</div>', unsafe_allow_html=True)

# Navigation
page = st.sidebar.selectbox(
    "Select Analysis",
    ["📊 Overview", "🔮 Churn Prediction", "💰 Sales Analysis", "👥 Customer Insights", "🤖 ML Models"]
)

# Filters
st.sidebar.markdown("### Filters")
date_range = st.sidebar.selectbox("Date Range", ["Last 30 days", "Last 90 days", "Last year", "All time"])
risk_level = st.sidebar.selectbox("Risk Level", ["All", "High Risk", "Medium Risk", "Low Risk"])
contract_type = st.sidebar.selectbox("Contract Type", ["All"] + list(customers_df['contract_type'].unique()))

# Apply filters
filtered_customers = customers_df.copy()
if risk_level != "All":
    if risk_level == "High Risk":
        filtered_customers = filtered_customers[filtered_customers['churn_probability'] > 0.6]
    elif risk_level == "Medium Risk":
        filtered_customers = filtered_customers[(filtered_customers['churn_probability'] > 0.3) & 
                                              (filtered_customers['churn_probability'] <= 0.6)]
    else:  # Low Risk
        filtered_customers = filtered_customers[filtered_customers['churn_probability'] <= 0.3]

if contract_type != "All":
    filtered_customers = filtered_customers[filtered_customers['contract_type'] == contract_type]

# Main content
st.markdown('<div class="main-header">Customer Churn Prediction & Sales Dashboard</div>', unsafe_allow_html=True)

if page == "📊 Overview":
    # Key metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric(
            label="Total Customers",
            value=f"{len(customers_df):,}",
            delta=f"+{np.random.randint(10, 50)} this month"
        )
    
    with col2:
        avg_churn = customers_df['churn_probability'].mean() * 100
        st.metric(
            label="Avg Churn Risk",
            value=f"{avg_churn:.1f}%",
            delta=f"-{np.random.uniform(0.5, 2.0):.1f}%"
        )
    
    with col3:
        monthly_revenue = customers_df['monthly_charges'].sum()
        st.metric(
            label="Monthly Revenue",
            value=f"${monthly_revenue:,.0f}",
            delta=f"+${np.random.randint(1000, 5000):,}"
        )
    
    with col4:
        at_risk_customers = len(customers_df[customers_df['churn_probability'] > 0.6])
        st.metric(
            label="High Risk Customers",
            value=f"{at_risk_customers:,}",
            delta=f"-{np.random.randint(5, 20)}"
        )
    
    # Charts
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📈 Revenue vs Churn Trend")
        
        # Monthly aggregation
        sales_df['month'] = sales_df['date'].dt.to_period('M')
        monthly_sales = sales_df.groupby('month')['sales'].sum().reset_index()
        monthly_sales['month'] = monthly_sales['month'].astype(str)
        
        # Create dual axis chart
        fig = make_subplots(specs=[[{"secondary_y": True}]])
        
        fig.add_trace(
            go.Scatter(
                x=monthly_sales['month'][-12:],
                y=monthly_sales['sales'][-12:],
                name="Revenue",
                line=dict(color="#3b82f6", width=3)
            ),
            secondary_y=False,
        )
        
        # Mock churn rate data
        churn_rates = [8.5, 7.8, 7.2, 6.9, 6.5, 6.8, 7.1, 6.4, 6.0, 5.8, 5.9, 6.2]
        fig.add_trace(
            go.Scatter(
                x=monthly_sales['month'][-12:],
                y=churn_rates,
                name="Churn Rate (%)",
                line=dict(color="#ef4444", width=3)
            ),
            secondary_y=True,
        )
        
        fig.update_xaxes(title_text="Month")
        fig.update_yaxes(title_text="Revenue ($)", secondary_y=False)
        fig.update_yaxes(title_text="Churn Rate (%)", secondary_y=True)
        fig.update_layout(height=400)
        
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.subheader("🎯 Customer Risk Distribution")
        
        # Risk distribution
        risk_bins = pd.cut(customers_df['churn_probability'], 
                          bins=[0, 0.3, 0.6, 1.0], 
                          labels=['Low Risk', 'Medium Risk', 'High Risk'])
        risk_counts = risk_bins.value_counts()
        
        fig = px.pie(
            values=risk_counts.values,
            names=risk_counts.index,
            color_discrete_map={
                'Low Risk': '#10b981',
                'Medium Risk': '#f59e0b',
                'High Risk': '#ef4444'
            }
        )
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)

elif page == "🔮 Churn Prediction":
    st.subheader("🔮 Churn Prediction Analysis")
    
    # Model training section
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.subheader("📊 Churn Probability Distribution")
        
        fig = px.histogram(
            customers_df,
            x='churn_probability',
            nbins=30,
            title="Distribution of Churn Probabilities",
            color_discrete_sequence=['#3b82f6']
        )
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.subheader("🎯 Feature Importance")
        
        # Mock feature importance
        features = ['Tenure', 'Support Tickets', 'Monthly Charges', 'Last Activity', 'Contract Type']
        importance = [0.35, 0.28, 0.22, 0.18, 0.15]
        
        fig = px.bar(
            x=importance,
            y=features,
            orientation='h',
            color=importance,
            color_continuous_scale='viridis'
        )
        fig.update_layout(height=400, showlegend=False)
        st.plotly_chart(fig, use_container_width=True)
    
    # Customer list with predictions
    st.subheader("👥 Customer Churn Predictions")
    
    # Add risk categories
    def get_risk_category(prob):
        if prob > 0.6:
            return "🔴 High Risk"
        elif prob > 0.3:
            return "🟡 Medium Risk"
        else:
            return "🟢 Low Risk"
    
    display_df = filtered_customers[['customer_name', 'tenure', 'monthly_charges', 'churn_probability']].copy()
    display_df['risk_category'] = display_df['churn_probability'].apply(get_risk_category)
    display_df['churn_probability'] = (display_df['churn_probability'] * 100).round(1)
    display_df.columns = ['Customer Name', 'Tenure (months)', 'Monthly Charges ($)', 'Churn Risk (%)', 'Risk Level']
    
    st.dataframe(
        display_df.head(20),
        use_container_width=True,
        hide_index=True
    )

elif page == "💰 Sales Analysis":
    st.subheader("💰 Sales Trend Analysis")
    
    # Time series analysis
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📈 Daily Sales Trend")
        
        # Last 90 days
        recent_sales = sales_df.tail(90)
        
        fig = px.line(
            recent_sales,
            x='date',
            y='sales',
            title="Daily Sales (Last 90 Days)",
            color_discrete_sequence=['#3b82f6']
        )
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.subheader("📊 Monthly Sales Growth")
        
        monthly_sales = sales_df.groupby(sales_df['date'].dt.to_period('M'))['sales'].sum().reset_index()
        monthly_sales['date'] = monthly_sales['date'].astype(str)
        monthly_sales['growth'] = monthly_sales['sales'].pct_change() * 100
        
        fig = px.bar(
            monthly_sales.tail(12),
            x='date',
            y='growth',
            title="Monthly Growth Rate (%)",
            color='growth',
            color_continuous_scale='RdYlGn'
        )
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)
    
    # Sales metrics
    col1, col2, col3 = st.columns(3)
    
    with col1:
        total_sales = sales_df['sales'].sum()
        st.metric("Total Sales", f"${total_sales:,.0f}")
    
    with col2:
        avg_daily_sales = sales_df['sales'].mean()
        st.metric("Avg Daily Sales", f"${avg_daily_sales:,.0f}")
    
    with col3:
        total_transactions = sales_df['transactions'].sum()
        st.metric("Total Transactions", f"{total_transactions:,}")

elif page == "👥 Customer Insights":
    st.subheader("👥 Customer Segmentation & Insights")
    
    # Customer segmentation using K-means
    features_for_clustering = ['age', 'tenure', 'monthly_charges', 'total_charges', 'support_tickets']
    X_cluster = customers_df[features_for_clustering].copy()
    
    # Standardize features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X_cluster)
    
    # K-means clustering
    kmeans = KMeans(n_clusters=4, random_state=42)
    customers_df['segment'] = kmeans.fit_predict(X_scaled)
    
    # Map segments to meaningful names
    segment_names = {0: 'High Value', 1: 'Medium Value', 2: 'Low Value', 3: 'At Risk'}
    customers_df['segment_name'] = customers_df['segment'].map(segment_names)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("🎯 Customer Segments")
        
        segment_counts = customers_df['segment_name'].value_counts()
        
        fig = px.pie(
            values=segment_counts.values,
            names=segment_counts.index,
            color_discrete_map={
                'High Value': '#10b981',
                'Medium Value': '#3b82f6',
                'Low Value': '#f59e0b',
                'At Risk': '#ef4444'
            }
        )
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.subheader("💰 Revenue by Segment")
        
        segment_revenue = customers_df.groupby('segment_name')['monthly_charges'].sum().reset_index()
        
        fig = px.bar(
            segment_revenue,
            x='segment_name',
            y='monthly_charges',
            color='segment_name',
            color_discrete_map={
                'High Value': '#10b981',
                'Medium Value': '#3b82f6',
                'Low Value': '#f59e0b',
                'At Risk': '#ef4444'
            }
        )
        fig.update_layout(height=400, showlegend=False)
        st.plotly_chart(fig, use_container_width=True)
    
    # Segment analysis table
    st.subheader("📊 Segment Analysis")
    
    segment_analysis = customers_df.groupby('segment_name').agg({
        'customer_id': 'count',
        'monthly_charges': 'mean',
        'churn_probability': 'mean',
        'tenure': 'mean',
        'age': 'mean'
    }).round(2)
    
    segment_analysis.columns = ['Customer Count', 'Avg Monthly Charges', 'Avg Churn Risk', 'Avg Tenure', 'Avg Age']
    st.dataframe(segment_analysis, use_container_width=True)

elif page == "🤖 ML Models":
    st.subheader("🤖 Machine Learning Model Performance")
    
    # Prepare data for modeling
    # Encode categorical variables
    le_contract = LabelEncoder()
    le_payment = LabelEncoder()
    le_internet = LabelEncoder()
    
    model_data = customers_df.copy()
    model_data['contract_encoded'] = le_contract.fit_transform(model_data['contract_type'])
    model_data['payment_encoded'] = le_payment.fit_transform(model_data['payment_method'])
    model_data['internet_encoded'] = le_internet.fit_transform(model_data['internet_service'])
    
    # Features for modeling
    feature_cols = ['age', 'tenure', 'monthly_charges', 'total_charges', 'support_tickets', 
                   'last_activity_days', 'contract_encoded', 'payment_encoded', 'internet_encoded']
    
    X = model_data[feature_cols]
    y = model_data['churn']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train models
    models = {
        'Logistic Regression': LogisticRegression(random_state=42),
        'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42)
    }
    
    model_results = {}
    
    for name, model in models.items():
        model.fit(X_train_scaled, y_train)
        y_pred = model.predict(X_test_scaled)
        
        model_results[name] = {
            'Accuracy': accuracy_score(y_test, y_pred),
            'Precision': precision_score(y_test, y_pred),
            'Recall': recall_score(y_test, y_pred),
            'F1-Score': f1_score(y_test, y_pred)
        }
    
    # Display results
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📊 Model Performance Comparison")
        
        results_df = pd.DataFrame(model_results).T
        
        fig = px.bar(
            results_df.reset_index(),
            x='index',
            y=['Accuracy', 'Precision', 'Recall', 'F1-Score'],
            barmode='group',
            title="Model Performance Metrics"
        )
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.subheader("🎯 Feature Importance (Random Forest)")
        
        # Get feature importance from Random Forest
        rf_model = models['Random Forest']
        feature_importance = pd.DataFrame({
            'feature': feature_cols,
            'importance': rf_model.feature_importances_
        }).sort_values('importance', ascending=True)
        
        fig = px.bar(
            feature_importance,
            x='importance',
            y='feature',
            orientation='h',
            color='importance',
            color_continuous_scale='viridis'
        )
        fig.update_layout(height=400, showlegend=False)
        st.plotly_chart(fig, use_container_width=True)
    
    # Model performance table
    st.subheader("📈 Detailed Model Metrics")
    st.dataframe(results_df, use_container_width=True)
    
    # Model insights
    st.subheader("💡 Model Insights")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.info("""
        **Logistic Regression Insights:**
        - Simple, interpretable model
        - Good baseline performance
        - Fast training and prediction
        - Works well with linear relationships
        """)
    
    with col2:
        st.info("""
        **Random Forest Insights:**
        - Handles non-linear relationships
        - Provides feature importance
        - Robust to outliers
        - Generally higher accuracy
        """)

# Footer
st.markdown("---")
st.markdown("""
<div style='text-align: center; color: #6b7280; padding: 2rem;'>
    <p>🚀 Customer Churn Prediction Dashboard | Built with Streamlit & Python</p>
    <p>📊 Data Analytics • 🤖 Machine Learning • 📈 Business Intelligence</p>
</div>
""", unsafe_allow_html=True)