# Import necessary libraries
import os
import random
import numpy as np
import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.model_selection import train_test_split
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.optimizers import Adam
import json

os.environ['TF_DETERMINISTIC_OPS'] = '1'

# Set seeds
random.seed(42)
np.random.seed(42)
tf.random.set_seed(42)

# Limit TensorFlow to single thread (optional)
os.environ["OMP_NUM_THREADS"] = "1"
os.environ["TF_NUM_INTRAOP_THREADS"] = "1"
os.environ["TF_NUM_INTEROP_THREADS"] = "1"

# Suppress TensorFlow warnings
import logging
logging.getLogger('tensorflow').setLevel(logging.ERROR)
med_binarizer = MultiLabelBinarizer()
cond_binarizer = MultiLabelBinarizer()
se_binarizer = MultiLabelBinarizer()
def medicine_ai():

    data = [
        {'medications': ['Phenylephrine', 'Albuterol'], 'conditions': ['common cold', 'asthma'], 'side_effects': ['nervousness', 'dizziness', 'tremor']},
        {'medications': ['Pyrethrin and Piperonyl Butoxide Topical'], 'conditions': ['lice infestation'], 'side_effects': ['itching of skin', 'redness of skin', 'trouble breathing']},
        {'medications': ['Hydrocortisone Injection', 'Chlordiazepoxide'], 'conditions': ['inflammation', 'anxiety'], 'side_effects': []},
        {'medications': ['Zidovudine', 'Abacavir'], 'conditions': ['HIV infection'], 'side_effects': ['dizziness', 'headache', 'tiredness']},
        {'medications': ['Abatacept Injection', 'Methotrexate'], 'conditions': ['rheumatoid arthritis'], 'side_effects': ['headache', 'diarrhea', 'stomach pain']},
        {'medications': ['Idecabtagene Vicleucel Injection', 'Dexamethasone'], 'conditions': ['multiple myeloma'], 'side_effects': ['constipation', 'weight loss', 'mouth pain']},
        {'medications': ['Amphotericin B Lipid Complex Injection', 'Fluconazole'], 'conditions': ['fungal infections'], 'side_effects': ['stomach pain', 'heartburn', 'weight loss']},
        {'medications': ['Abrocitinib', 'Topical Corticosteroid'], 'conditions': ['eczema'], 'side_effects': ['headache', 'dizziness', 'rash']},
        {'medications': ['Lidocaine Transdermal Patch', 'Ibuprofen'], 'conditions': ['local pain', 'inflammation'], 'side_effects': ['redness', 'itching', 'blisters']},
        {'medications': ['Isotretinoin', 'Clindamycin', 'Benzoyl Peroxide'], 'conditions': ['severe acne'], 'side_effects': ['dry skin', 'hair loss', 'headache']},
        {'medications': ['Fentanyl', 'Oxycodone', 'Hydrocodone'], 'conditions': ['severe pain'], 'side_effects': ['nausea', 'vomiting', 'drowsiness']},
        {'medications': ['Acamprosate', 'Naltrexone', 'Disulfiram'], 'conditions': ['alcohol dependence'], 'side_effects': ['diarrhea', 'anxiety', 'drowsiness']},
        {'medications': ['Clindamycin and Benzoyl Peroxide Topical', 'Tetracycline'], 'conditions': ['acne'], 'side_effects': ['dry skin', 'itching', 'severe diarrhea']},
        {'medications': ['Acarbose', 'Metformin', 'Insulin'], 'conditions': ['diabetes'], 'side_effects': ['dizziness', 'sweating', 'hypoglycemia']},
        {'medications': ['Somatropin', 'Levothyroxine'], 'conditions': ['growth hormone deficiency', 'thyroid disorder'], 'side_effects': ['nervousness', 'dizziness', 'sleeplessness']},
        {'medications': ['Pseudoephedrine', 'Phenylephrine'], 'conditions': ['nasal congestion'], 'side_effects': ['restlessness', 'vomiting', 'headache']},
        {'medications': ['Hydrochlorothiazide', 'Lisinopril'], 'conditions': ['hypertension'], 'side_effects': []},
        {'medications': ['Perindopril', 'Amlodipine'], 'conditions': ['hypertension'], 'side_effects': ['cough', 'dizziness', 'stomach pain']},
        {'medications': ['Acetaminophen', 'Codeine'], 'conditions': ['pain', 'fever'], 'side_effects': ['constipation', 'rash', 'hives']},
        {'medications': ['Acetaminophen Injection', 'Morphine', 'Oxycodone'], 'conditions': ['postoperative pain'], 'side_effects': ['vomiting', 'headache', 'drowsiness']},
        {'medications': ['Medroxyprogesterone Injection', 'Estrogen'], 'conditions': ['menstrual disorders'], 'side_effects': ['weight gain', 'depression', 'breast pain']},
        {'medications': ['Medroxyprogesterone', 'Levonorgestrel'], 'conditions': ['menstrual disorders'], 'side_effects': ['acne', 'irregular bleeding', 'hair loss']},
        {'medications': ['Acetylcysteine Oral Inhalation', 'Albuterol'], 'conditions': ['respiratory disorders'], 'side_effects': ['vomiting', 'fever', 'cough']},
        {'medications': ['Levothyroxine', 'Metformin'], 'conditions': ['thyroid disorder', 'diabetes'], 'side_effects': ['weight loss', 'nausea']},
        {'medications': ['Fluoxetine', 'Alprazolam', 'Clonazepam'], 'conditions': ['depression', 'anxiety'], 'side_effects': ['insomnia', 'drowsiness']},
        {'medications': ['Aspirin', 'Clopidogrel', 'Warfarin'], 'conditions': ['heart disease'], 'side_effects': ['bleeding', 'bruising']},
        {'medications': ['Ibuprofen', 'Prednisone'], 'conditions': ['arthritis'], 'side_effects': ['stomach pain', 'increased appetite']},
        {'medications': ['Warfarin', 'Aspirin'], 'conditions': ['heart disease'], 'side_effects': ['bleeding', 'bruising']},
        {'medications': ['Metformin', 'Insulin', 'Glipizide'], 'conditions': ['diabetes'], 'side_effects': ['hypoglycemia', 'weight gain']},
        {'medications': ['Atorvastatin', 'Simvastatin'], 'conditions': ['high cholesterol'], 'side_effects': ['muscle pain', 'liver enzyme abnormalities']},
        {'medications': ['Metoprolol', 'Lisinopril', 'Hydrochlorothiazide'], 'conditions': ['hypertension'], 'side_effects': ['fatigue', 'cough']},
        {'medications': ['Albuterol', 'Prednisone', 'Montelukast'], 'conditions': ['asthma'], 'side_effects': ['tremor', 'increased appetite']},
        {'medications': ['Omeprazole', 'Aspirin', 'Clopidogrel'], 'conditions': ['acid reflux', 'heart disease'], 'side_effects': ['abdominal pain', 'bleeding']},
        {'medications': ['Simvastatin', 'Amlodipine'], 'conditions': ['high cholesterol', 'hypertension'], 'side_effects': ['muscle pain', 'swelling']},
        {'medications': ['Metformin', 'Glipizide', 'Sitagliptin'], 'conditions': ['diabetes'], 'side_effects': ['hypoglycemia', 'nausea']},
        {'medications': ['Fluoxetine', 'Alprazolam'], 'conditions': ['depression', 'anxiety'], 'side_effects': ['insomnia', 'dry mouth']},
        {'medications': ['Aspirin', 'Warfarin'], 'conditions': ['heart disease'], 'side_effects': ['bleeding', 'bruising']},
        {'medications': ['Levothyroxine', 'Fluoxetine'], 'conditions': ['thyroid disorder', 'depression'], 'side_effects': ['insomnia', 'weight loss']},
        {'medications': ['Ibuprofen', 'Acetaminophen', 'Aspirin'], 'conditions': ['pain', 'fever'], 'side_effects': ['stomach upset', 'nausea']},
        {'medications': ['Metformin', 'Insulin'], 'conditions': ['diabetes'], 'side_effects': ['hypoglycemia', 'weight gain']},
        {'medications': ['Albuterol', 'Fluticasone'], 'conditions': ['asthma'], 'side_effects': ['thrush', 'tremor']},
        {'medications': ['Prednisone', 'Methotrexate'], 'conditions': ['rheumatoid arthritis'], 'side_effects': ['increased appetite', 'nausea']},
        {'medications': ['Omeprazole', 'Metformin'], 'conditions': ['acid reflux', 'diabetes'], 'side_effects': ['nausea', 'abdominal pain']},
        {'medications': ['Levothyroxine', 'Prednisone'], 'conditions': ['thyroid disorder', 'arthritis'], 'side_effects': ['weight loss', 'mood swings']},
        {'medications': ['Atorvastatin', 'Amlodipine'], 'conditions': ['high cholesterol', 'hypertension'], 'side_effects': ['muscle pain', 'swelling']},
        {'medications': ['Simvastatin', 'Hydrochlorothiazide'], 'conditions': ['high cholesterol', 'hypertension'], 'side_effects': ['dizziness', 'muscle pain']},
        {'medications': ['Lisinopril', 'Aspirin'], 'conditions': ['hypertension', 'heart disease'], 'side_effects': ['cough', 'bleeding']},
        {'medications': ['Aspirin', 'Clopidogrel', 'Lisinopril'], 'conditions': ['heart disease'], 'side_effects': ['bleeding', 'dizziness']},
        {'medications': ['Albuterol', 'Ipratropium'], 'conditions': ['COPD'], 'side_effects': ['dry mouth', 'tremor']},
        {'medications': ['Aspirin', 'Clopidogrel'], 'conditions': ['heart disease'], 'side_effects': ['bleeding', 'bruising']},
        {'medications': ['Ibuprofen', 'Hydrocodone', 'Acetaminophen'], 'conditions': ['chronic pain'], 'side_effects': ['drowsiness', 'constipation']},
        {'medications': ['Metoprolol', 'Aspirin'], 'conditions': ['hypertension', 'heart disease'], 'side_effects': ['fatigue', 'bleeding']},
        {'medications': ['Simvastatin', 'Amlodipine'], 'conditions': ['high cholesterol', 'hypertension'], 'side_effects': ['muscle pain', 'swelling']},
        {'medications': ['Levothyroxine', 'Fluoxetine'], 'conditions': ['thyroid disorder', 'depression'], 'side_effects': ['insomnia', 'weight loss']},
        {'medications': ['Metformin', 'Sitagliptin'], 'conditions': ['diabetes'], 'side_effects': ['nausea', 'diarrhea']},
        {'medications': ['Prednisone', 'Hydrocortisone'], 'conditions': ['inflammation'], 'side_effects': ['increased appetite', 'nausea']},
        {'medications': ['Albuterol', 'Fluticasone', 'Ipratropium'], 'conditions': ['asthma', 'COPD'], 'side_effects': ['dry mouth', 'tremor']},
        {'medications': ['Simvastatin', 'Ezetimibe'], 'conditions': ['high cholesterol'], 'side_effects': ['muscle pain', 'diarrhea']},
        {'medications': ['Metoprolol', 'Aspirin', 'Warfarin'], 'conditions': ['hypertension', 'heart disease'], 'side_effects': ['fatigue', 'bleeding']},
        {'medications': ['Simvastatin', 'Hydrochlorothiazide', 'Lisinopril'], 'conditions': ['high cholesterol', 'hypertension'], 'side_effects': ['dizziness', 'muscle pain']},
        {'medications': ['Lisinopril', 'Aspirin'], 'conditions': ['hypertension', 'heart disease'], 'side_effects': ['cough', 'bleeding']}
    ]


    # Convert to DataFrame
    df = pd.DataFrame(data)





    med_binarizer.fit(df['medications'])
    cond_binarizer.fit(df['conditions'])
    se_binarizer.fit(df['side_effects'])


    X_med = med_binarizer.transform(df['medications'])
    X_cond = cond_binarizer.transform(df['conditions'])
    Y = se_binarizer.transform(df['side_effects'])


    X = np.hstack([X_med, X_cond])

    X_train, X_val, Y_train, Y_val = train_test_split(X, Y, test_size=0.2, random_state=42)


    model = Sequential([
        Dense(64, input_dim=X.shape[1], activation='relu'),
        Dense(32, activation='relu'),
        Dense(Y.shape[1], activation='sigmoid')  # Sigmoid for multi-label classification
    ])


    model.compile(optimizer=Adam(learning_rate=0.001),
                loss='binary_crossentropy',
                metrics=['accuracy'])


    model.fit(X_train, Y_train, epochs=100, batch_size=4, shuffle=False, verbose=1, validation_data=(X_val, Y_val))

    return model

def predict(model: Sequential, med):
    new_patient = {
        'past_medications': ['Ibuprofen', 'Naproxen'],
        'new_medication': [med],
        'conditions': ['diabetes']
    }


    all_medications = new_patient['past_medications'] + new_patient['new_medication']


    X_med_new = med_binarizer.transform([all_medications])
    X_cond_new = cond_binarizer.transform([new_patient['conditions']])


    X_new = np.hstack([X_med_new, X_cond_new])


    probabilities = model.predict(X_new)[0]


    side_effects = se_binarizer.classes_
    predictions = dict(zip(side_effects, probabilities * 100))  # Convert to percentage




    sorted_predictions = dict(sorted(predictions.items(), key=lambda item: item[1], reverse=True))


    print("Predicted Side Effects Probabilities:")


    # Assuming `predictions` is the dictionary with side effects and probabilities
    # Convert NumPy values to Python floats
    filtered_side_effects = {key: float(value) for key, value in sorted_predictions.items() if value > 0.1}

    # Convert the filtered dictionary to JSON
    filtered_side_effects_json = json.dumps(filtered_side_effects, indent=4)

    # Print the JSON string
    return filtered_side_effects_json




# # Import necessary libraries
# import numpy as np
# import pandas as pd
# from sklearn.preprocessing import MultiLabelBinarizer
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Dense
# from tensorflow.keras.optimizers import Adam

# # Suppress TensorFlow warnings
# import logging
# logging.getLogger('tensorflow').setLevel(logging.ERROR)


# # Sample data
# data = [
#     # Existing data points
#     {'medications': ['aspirin', 'ibuprofen'], 'conditions': ['hypertension', 'diabetes'], 'side_effects': ['drowsiness', 'headache']},
#     {'medications': ['metformin', 'lisinopril'], 'conditions': ['diabetes'], 'side_effects': ['nausea', 'dizziness']},
#     {'medications': ['aspirin', 'metformin'], 'conditions': ['hypertension'], 'side_effects': ['nausea']},
#     {'medications': ['ibuprofen'], 'conditions': ['diabetes'], 'side_effects': ['headache', 'dizziness']},
#     {'medications': ['atorvastatin'], 'conditions': ['high cholesterol'], 'side_effects': ['muscle pain']},
#     {'medications': ['albuterol'], 'conditions': ['asthma'], 'side_effects': ['tremor', 'nervousness']},
#     {'medications': ['omeprazole'], 'conditions': ['acid reflux'], 'side_effects': ['abdominal pain', 'diarrhea']},
#     {'medications': ['metoprolol'], 'conditions': ['heart disease'], 'side_effects': ['fatigue', 'dizziness']},
#     {'medications': ['hydrocodone'], 'conditions': ['chronic pain'], 'side_effects': ['constipation', 'drowsiness']},
#     {'medications': ['levothyroxine'], 'conditions': ['thyroid disorder'], 'side_effects': ['weight loss', 'insomnia']},
#     {'medications': ['warfarin'], 'conditions': ['heart disease'], 'side_effects': ['bleeding', 'bruising']},
#     {'medications': ['insulin'], 'conditions': ['diabetes'], 'side_effects': ['hypoglycemia', 'weight gain']},
#     {'medications': ['prednisone'], 'conditions': ['arthritis'], 'side_effects': ['increased appetite', 'mood swings']},
#     {'medications': ['simvastatin'], 'conditions': ['high cholesterol'], 'side_effects': ['muscle pain', 'liver enzyme abnormalities']},
#     {'medications': ['amlodipine'], 'conditions': ['hypertension'], 'side_effects': ['swelling', 'fatigue']},
#     {'medications': ['aspirin', 'clopidogrel'], 'conditions': ['heart disease'], 'side_effects': ['bleeding']},
#     {'medications': ['lisinopril', 'hydrochlorothiazide'], 'conditions': ['hypertension'], 'side_effects': ['cough', 'dizziness']},
#     {'medications': ['metformin', 'sitagliptin'], 'conditions': ['diabetes'], 'side_effects': ['nausea', 'diarrhea']},
#     {'medications': ['fluoxetine'], 'conditions': ['depression'], 'side_effects': ['insomnia', 'dry mouth']},
#     {'medications': ['ibuprofen', 'hydrocodone'], 'conditions': ['chronic pain'], 'side_effects': ['drowsiness', 'constipation']},
#     {'medications': ['albuterol', 'prednisone'], 'conditions': ['asthma'], 'side_effects': ['tremor', 'increased appetite']},
#     {'medications': ['omeprazole', 'aspirin'], 'conditions': ['acid reflux', 'heart disease'], 'side_effects': ['abdominal pain']},
#     {'medications': ['levothyroxine'], 'conditions': ['thyroid disorder'], 'side_effects': ['weight loss', 'anxiety']},
#     {'medications': ['atorvastatin', 'amlodipine'], 'conditions': ['high cholesterol', 'hypertension'], 'side_effects': ['swelling', 'muscle pain']},
#     {'medications': ['metformin', 'insulin'], 'conditions': ['diabetes'], 'side_effects': ['hypoglycemia', 'weight gain']},
#     {'medications': ['simvastatin', 'ezetimibe'], 'conditions': ['high cholesterol'], 'side_effects': ['muscle pain', 'diarrhea']},
#     {'medications': ['aspirin', 'warfarin'], 'conditions': ['heart disease'], 'side_effects': ['bleeding', 'bruising']},
#     {'medications': ['hydrochlorothiazide'], 'conditions': ['hypertension'], 'side_effects': ['dizziness', 'increased urination']},
#     {'medications': ['metoprolol', 'lisinopril'], 'conditions': ['hypertension'], 'side_effects': ['fatigue', 'cough']},
#     {'medications': ['albuterol', 'fluticasone'], 'conditions': ['asthma'], 'side_effects': ['thrush', 'tremor']},
#     {'medications': ['omeprazole', 'metformin'], 'conditions': ['acid reflux', 'diabetes'], 'side_effects': ['nausea', 'abdominal pain']},
#     {'medications': ['levothyroxine', 'prednisone'], 'conditions': ['thyroid disorder', 'arthritis'], 'side_effects': ['weight loss', 'mood swings']},
#     {'medications': ['atorvastatin', 'aspirin'], 'conditions': ['high cholesterol', 'heart disease'], 'side_effects': ['muscle pain', 'bleeding']},
#     {'medications': ['hydrocodone', 'ibuprofen'], 'conditions': ['chronic pain'], 'side_effects': ['drowsiness', 'constipation']},
#     {'medications': ['metformin', 'glipizide'], 'conditions': ['diabetes'], 'side_effects': ['hypoglycemia', 'nausea']},
#     {'medications': ['amlodipine', 'hydrochlorothiazide'], 'conditions': ['hypertension'], 'side_effects': ['swelling', 'dizziness']},
#     {'medications': ['fluoxetine', 'alprazolam'], 'conditions': ['depression', 'anxiety'], 'side_effects': ['drowsiness', 'dry mouth']},
#     {'medications': ['albuterol', 'prednisone'], 'conditions': ['asthma'], 'side_effects': ['increased appetite', 'tremor']},
#     {'medications': ['aspirin', 'omeprazole'], 'conditions': ['heart disease', 'acid reflux'], 'side_effects': ['abdominal pain', 'bleeding']},
#     {'medications': ['metformin', 'sitagliptin'], 'conditions': ['diabetes'], 'side_effects': ['diarrhea', 'nausea']},
#     {'medications': ['lisinopril', 'atorvastatin'], 'conditions': ['hypertension', 'high cholesterol'], 'side_effects': ['cough', 'muscle pain']},
#     {'medications': ['levothyroxine', 'fluoxetine'], 'conditions': ['thyroid disorder', 'depression'], 'side_effects': ['insomnia', 'weight loss']},
#     {'medications': ['hydrocodone', 'acetaminophen'], 'conditions': ['chronic pain'], 'side_effects': ['drowsiness', 'constipation']},
#     {'medications': ['warfarin'], 'conditions': ['heart disease'], 'side_effects': ['bleeding', 'bruising']},
#     {'medications': ['aspirin', 'clopidogrel'], 'conditions': ['heart disease'], 'side_effects': ['bleeding', 'bruising']},
#     {'medications': ['metoprolol', 'aspirin'], 'conditions': ['hypertension', 'heart disease'], 'side_effects': ['fatigue', 'bleeding']},
#     {'medications': ['simvastatin', 'amlodipine'], 'conditions': ['high cholesterol', 'hypertension'], 'side_effects': ['muscle pain', 'swelling']},
#     {'medications': ['omeprazole', 'metformin'], 'conditions': ['acid reflux', 'diabetes'], 'side_effects': ['nausea', 'abdominal pain']},
#     {'medications': ['albuterol', 'ipratropium'], 'conditions': ['COPD'], 'side_effects': ['dry mouth', 'tremor']},
#     {'medications': ['levothyroxine'], 'conditions': ['thyroid disorder'], 'side_effects': ['weight loss', 'anxiety']},
#     {'medications': ['metformin', 'insulin'], 'conditions': ['diabetes'], 'side_effects': ['hypoglycemia', 'weight gain']},
#     {'medications': ['atorvastatin', 'aspirin'], 'conditions': ['high cholesterol', 'heart disease'], 'side_effects': ['muscle pain', 'bleeding']},
#     {'medications': ['hydrocodone', 'ibuprofen'], 'conditions': ['chronic pain'], 'side_effects': ['drowsiness', 'constipation']},
#     {'medications': ['lisinopril', 'hydrochlorothiazide'], 'conditions': ['hypertension'], 'side_effects': ['cough', 'dizziness']},
#     {'medications': ['metformin', 'sitagliptin'], 'conditions': ['diabetes'], 'side_effects': ['nausea', 'diarrhea']},
#     {'medications': ['aspirin', 'omeprazole'], 'conditions': ['heart disease', 'acid reflux'], 'side_effects': ['abdominal pain', 'bleeding']},
#     {'medications': ['albuterol', 'prednisone'], 'conditions': ['asthma'], 'side_effects': ['increased appetite', 'tremor']},
#     {'medications': ['fluoxetine'], 'conditions': ['depression'], 'side_effects': ['insomnia', 'dry mouth']},
#     {'medications': ['amlodipine', 'atorvastatin'], 'conditions': ['hypertension', 'high cholesterol'], 'side_effects': ['swelling', 'muscle pain']},
#     {'medications': ['metoprolol', 'lisinopril'], 'conditions': ['hypertension'], 'side_effects': ['fatigue', 'cough']},
#     {'medications': ['levothyroxine', 'fluoxetine'], 'conditions': ['thyroid disorder', 'depression'], 'side_effects': ['weight loss', 'insomnia']},
#     {'medications': ['hydrocodone', 'acetaminophen'], 'conditions': ['chronic pain'], 'side_effects': ['drowsiness', 'constipation']},
#     {'medications': ['warfarin'], 'conditions': ['heart disease'], 'side_effects': ['bleeding', 'bruising']},
#     {'medications': ['aspirin', 'clopidogrel'], 'conditions': ['heart disease'], 'side_effects': ['bleeding', 'bruising']},
#     {'medications': ['metoprolol', 'aspirin'], 'conditions': ['hypertension', 'heart disease'], 'side_effects': ['fatigue', 'bleeding']},
#     {'medications': ['simvastatin', 'amlodipine'], 'conditions': ['high cholesterol', 'hypertension'], 'side_effects': ['muscle pain', 'swelling']},
#     {'medications': ['omeprazole', 'metformin'], 'conditions': ['acid reflux', 'diabetes'], 'side_effects': ['nausea', 'abdominal pain']},
#     {'medications': ['albuterol', 'ipratropium'], 'conditions': ['COPD'], 'side_effects': ['dry mouth', 'tremor']},
#     {'medications': ['levothyroxine'], 'conditions': ['thyroid disorder'], 'side_effects': ['weight loss', 'anxiety']},
#     {'medications': ['metformin', 'insulin'], 'conditions': ['diabetes'], 'side_effects': ['hypoglycemia', 'weight gain']},
#     {'medications': ['atorvastatin', 'aspirin'], 'conditions': ['high cholesterol', 'heart disease'], 'side_effects': ['muscle pain', 'bleeding']},
#     {'medications': ['hydrocodone', 'ibuprofen'], 'conditions': ['chronic pain'], 'side_effects': ['drowsiness', 'constipation']},
#     {'medications': ['lisinopril', 'hydrochlorothiazide'], 'conditions': ['hypertension'], 'side_effects': ['cough', 'dizziness']},
#     {'medications': ['metformin', 'sitagliptin'], 'conditions': ['diabetes'], 'side_effects': ['nausea', 'diarrhea']},
#     {'medications': ['aspirin', 'omeprazole'], 'conditions': ['heart disease', 'acid reflux'], 'side_effects': ['abdominal pain', 'bleeding']},
#     {'medications': ['albuterol', 'prednisone'], 'conditions': ['asthma'], 'side_effects': ['increased appetite', 'tremor']},
#     {'medications': ['fluoxetine'], 'conditions': ['depression'], 'side_effects': ['insomnia', 'dry mouth']},
#     {'medications': ['amlodipine', 'atorvastatin'], 'conditions': ['hypertension', 'high cholesterol'], 'side_effects': ['swelling', 'muscle pain']},
#     {'medications': ['metoprolol', 'lisinopril'], 'conditions': ['hypertension'], 'side_effects': ['fatigue', 'cough']},
#     {'medications': ['levothyroxine', 'fluoxetine'], 'conditions': ['thyroid disorder', 'depression'], 'side_effects': ['weight loss', 'insomnia']},
#     {'medications': ['hydrocodone', 'acetaminophen'], 'conditions': ['chronic pain'], 'side_effects': ['drowsiness', 'constipation']},
#     {'medications': ['warfarin'], 'conditions': ['heart disease'], 'side_effects': ['bleeding', 'bruising']},
#     {'medications': ['metformin', 'pioglitazone'], 'conditions': ['diabetes'], 'side_effects': ['weight gain', 'edema']},
#     {'medications': ['aspirin'], 'conditions': ['heart disease'], 'side_effects': ['bleeding']},
#     {'medications': ['lisinopril'], 'conditions': ['hypertension'], 'side_effects': ['cough']},
#     {'medications': ['simvastatin'], 'conditions': ['high cholesterol'], 'side_effects': ['muscle pain']},
#     {'medications': ['albuterol'], 'conditions': ['asthma'], 'side_effects': ['tremor']},
#     {'medications': ['omeprazole'], 'conditions': ['acid reflux'], 'side_effects': ['abdominal pain']},
#     {'medications': ['hydrocodone'], 'conditions': ['chronic pain'], 'side_effects': ['constipation']},
#     {'medications': ['levothyroxine'], 'conditions': ['thyroid disorder'], 'side_effects': ['weight loss']},
#     {'medications': ['metformin'], 'conditions': ['diabetes'], 'side_effects': ['nausea']},
#     {'medications': ['amlodipine'], 'conditions': ['hypertension'], 'side_effects': ['swelling']},
#     {'medications': ['fluoxetine'], 'conditions': ['depression'], 'side_effects': ['insomnia']},
#     {'medications': ['ibuprofen'], 'conditions': ['arthritis'], 'side_effects': ['stomach upset']},
#     {'medications': ['prednisone'], 'conditions': ['arthritis'], 'side_effects': ['increased appetite']},
#     {'medications': ['metoprolol'], 'conditions': ['hypertension'], 'side_effects': ['fatigue']},
#     {'medications': ['warfarin'], 'conditions': ['heart disease'], 'side_effects': ['bleeding']},
#     {'medications': ['atorvastatin'], 'conditions': ['high cholesterol'], 'side_effects': ['muscle pain']},
#     {'medications': ['lisinopril'], 'conditions': ['hypertension'], 'side_effects': ['cough']},
#     {'medications': ['aspirin'], 'conditions': ['heart disease'], 'side_effects': ['bleeding']},
#     {'medications': ['metformin'], 'conditions': ['diabetes'], 'side_effects': ['diarrhea']},
#     {'medications': ['levothyroxine'], 'conditions': ['thyroid disorder'], 'side_effects': ['insomnia']},
#     {'medications': ['hydrocodone'], 'conditions': ['chronic pain'], 'side_effects': ['drowsiness']},
#     {'medications': ['albuterol'], 'conditions': ['asthma'], 'side_effects': ['tremor']},
#     {'medications': ['omeprazole'], 'conditions': ['acid reflux'], 'side_effects': ['diarrhea']},
#     {'medications': ['amlodipine'], 'conditions': ['hypertension'], 'side_effects': ['fatigue']},
#     {'medications': ['simvastatin'], 'conditions': ['high cholesterol'], 'side_effects': ['muscle pain']},
#     {'medications': ['fluoxetine'], 'conditions': ['depression'], 'side_effects': ['dry mouth']},
#     {'medications': ['metformin'], 'conditions': ['diabetes'], 'side_effects': ['nausea']},
#     {'medications': ['lisinopril'], 'conditions': ['hypertension'], 'side_effects': ['dizziness']},
#     {'medications': ['aspirin'], 'conditions': ['heart disease'], 'side_effects': ['bleeding']},
#     {'medications': ['atorvastatin'], 'conditions': ['high cholesterol'], 'side_effects': ['liver enzyme abnormalities']},
#     {'medications': ['levothyroxine'], 'conditions': ['thyroid disorder'], 'side_effects': ['weight loss']},
#     {'medications': ['hydrocodone'], 'conditions': ['chronic pain'], 'side_effects': ['constipation']},
#     {'medications': ['omeprazole'], 'conditions': ['acid reflux'], 'side_effects': ['abdominal pain']},
#     {'medications': ['albuterol'], 'conditions': ['asthma'], 'side_effects': ['nervousness']},
#     {'medications': ['simvastatin'], 'conditions': ['high cholesterol'], 'side_effects': ['muscle pain']},
#     {'medications': ['amlodipine'], 'conditions': ['hypertension'], 'side_effects': ['swelling']},
#     {'medications': ['metformin'], 'conditions': ['diabetes'], 'side_effects': ['diarrhea']},
#     {'medications': ['aspirin'], 'conditions': ['heart disease'], 'side_effects': ['bleeding']},
#     {'medications': ['lisinopril'], 'conditions': ['hypertension'], 'side_effects': ['cough']},
#     {'medications': ['fluoxetine'], 'conditions': ['depression'], 'side_effects': ['insomnia']},
# ]


# # Convert to DataFrame
# df = pd.DataFrame(data)




# med_binarizer = MultiLabelBinarizer()
# cond_binarizer = MultiLabelBinarizer()
# se_binarizer = MultiLabelBinarizer()


# med_binarizer.fit(df['medications'])
# cond_binarizer.fit(df['conditions'])
# se_binarizer.fit(df['side_effects'])


# X_med = med_binarizer.transform(df['medications'])
# X_cond = cond_binarizer.transform(df['conditions'])
# Y = se_binarizer.transform(df['side_effects'])


# X = np.hstack([X_med, X_cond])


# model = Sequential([
#     Dense(16, input_dim=X.shape[1], activation='relu'),
#     Dense(16, activation='relu'),
#     Dense(Y.shape[1], activation='sigmoid')  # Sigmoid for multi-label classification
# ])


# model.compile(optimizer=Adam(learning_rate=0.01),
#               loss='binary_crossentropy',
#               metrics=['accuracy'])


# model.fit(X, Y, epochs=50, batch_size=1, verbose=0)




# new_patient = {
#     'past_medications': ['aspirin', 'ibuprofen'],
#     'new_medication': ['metformin'],
#     'conditions': ['hypertension', 'diabetes']
# }


# all_medications = new_patient['past_medications'] + new_patient['new_medication']


# X_med_new = med_binarizer.transform([all_medications])
# X_cond_new = cond_binarizer.transform([new_patient['conditions']])


# X_new = np.hstack([X_med_new, X_cond_new])

# probabilities = model.predict(X_new)[0]


# side_effects = se_binarizer.classes_
# predictions = dict(zip(side_effects, probabilities * 100)) 




# sorted_predictions = dict(sorted(predictions.items(), key=lambda item: item[1], reverse=True))


# print("Predicted Side Effects Probabilities:")
# for side_effect, probability in sorted_predictions.items():
#     if probability > 0.001:
#         print(f"{side_effect}: {probability:.2f}%")

