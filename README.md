# AI Padel Court Designer

An interactive 3D web application that allows users to design custom Padel courts. Users can manually adjust colors and materials or leverage the Google Gemini API to generate unique designs from text prompts.

This application demonstrates the use of the Google Gemini API for creative, structured JSON generation, integrated into a real-time 3D environment built with React and Three.js.

## Features

-   **Interactive 3D Viewer**: Orbit, pan, and zoom around a detailed 3D model of a Padel court.
-   **AI-Powered Design**: Simply describe your desired court theme (e.g., "A court inspired by a sunset," "a futuristic design with neon green accents"), and the Gemini API will generate a complete color scheme.
-   **Manual Customization**: Fine-tune every aspect of the court, including:
    -   Court Playing Surface Color
    -   Line Color
    -   Out-of-Play Area Color
    -   Frame/Structure Color
    -   Net Color & Logo Color
    -   Glass Wall Opacity
-   **Real-time Updates**: All changes, whether manual or AI-generated, are reflected instantly in the 3D view.
-   **Bilingual Support**: Switch between English (EN) and Indonesian (ID) for the user interface.
-   **Responsive Design**: Works on both desktop and mobile devices.

## Technologies Used

-   **Frontend**: React, TypeScript, Tailwind CSS
-   **3D Rendering**: Three.js, @react-three/fiber, @react-three/drei
-   **AI Model**: Google Gemini API (`gemini-2.5-flash`) via `@google/genai` SDK
-   **Icons**: lucide-react

## How to Use

1.  **AI Designer**:
    -   Locate the "AI Designer" panel on the left.
    -   In the text area, type a descriptive prompt for the court design you envision.
    -   Click the "Generate Design" button.
    -   Watch as the 3D model updates with the new, AI-generated design.

2.  **Manual Controls**:
    -   Below the AI designer, you'll find the "Manual Controls" panel.
    -   Use the color pickers to change the colors of different court elements.
    -   Adjust the "Glass Opacity" slider to control the transparency of the walls.
    -   Click the reset icon to return to the default court design at any time.

3.  **3D Navigation**:
    -   **Orbit**: Click and drag the left mouse button to rotate the camera around the court.
    -   **Zoom**: Use the mouse scroll wheel to zoom in and out.
    -   **Pan**: Click and drag the right mouse button to move the camera horizontally and vertically.
