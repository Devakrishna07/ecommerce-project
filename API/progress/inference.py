import numpy as np
import torch, json, base64, cv2
from ultralytics import YOLO


def input_fn(request_body):
    print("Executing input_fn from inference.py ...")
    model = YOLO("C:/Users/USER/Desktop/Project/AI/Yolo/Lens/best.pt")
    jpg_original = base64.b64decode(request_body)
    jpg_as_np = np.frombuffer(jpg_original, dtype=np.uint8)
    img = cv2.imdecode(jpg_as_np, flags=-1)

    # Convert 4-channel (RGBA) to 3-channel (RGB)
    if img.shape[2] == 4:
        img = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)

    return predict_fn(img, model)


def predict_fn(input_data, model):
    print("Executing predict_fn from inference.py ...")
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device)

    with torch.no_grad():
        results = model(input_data)

    return output_fn(results)


# Class index to object name mapping
CLASS_NAMES = {
    0: "8206985", 1: "12027422", 2: "15193748", 3: "20237088", 4: "25674670", 5: "28086694", 6: "29962775", 7: "30401597", 8: "30706974",
    9: "30902272", 10: "31179711", 11: "31382498", 12: "31727960", 13: "31800667", 14: "31821941", 15: "32461792", 16: "2050688",
    17: "1849875", 18: "10622762", 19: "11904108", 20: "23800362", 21: "28932986", 22: "31014875"
}

def output_fn(prediction_output):
    print("Executing output_fn from inference.py ...")

    detected_classes = set()  # Use a set to avoid duplicates

    for result in prediction_output:
        # Handle Classification Mode
        if hasattr(result, "probs") and result.probs is not None:
            probs = result.probs.cpu().numpy()
            if probs.size > 0:
                class_idx = int(probs.argmax())  # Get highest probability class
                detected_classes.add(class_idx)

        # Handle Object Detection Mode
        if hasattr(result, "boxes") and result.boxes is not None:
            if result.boxes.cls.numel() > 0:
                class_indices = result.boxes.cls.cpu().numpy().astype(int)
                detected_classes.update(class_indices.tolist())

    # If no classes detected, return empty placeholder
    if not detected_classes:
        return json.dumps("Oops Try again")  # Return "_"

    # Convert detected class indices to corresponding object names
    detected_objects = [CLASS_NAMES[idx] for idx in detected_classes if idx in CLASS_NAMES]

    # Return the formatted string
    response = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST"
        },
        "body": json.dumps(detected_objects)  # Ensures it returns "\"F\"" format
    }

    return response
