# FINAL_CAMPUS_COURT: University Basketball Court Visualization

This repository contains the final 3D model of the University Basketball Court's Seating and Structural area, created in Blender, and its functional visualization using **React** and **Three.js**.

The project fulfills all requirements for the Modeling and ThreeJS Visualization components of the Final Submission.

---
</br>
## Project Setup and Local Development

Follow these steps to clone the repository and run the visualization locally.

### Prerequisites

You must have **Node.js** and **npm** (or yarn/pnpm) installed.

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/vrishank-na/PES-Basketball-court.git
    cd PES-Basketball-court
    ```
2.  **Install Dependencies:**
    *The `node_modules` folder will be created here.*
    ```bash
    npm install
    ```
3.  **Start the Local Server:**
    ```bash
    npm run dev
    ```
    The application will launch in your browser (typically at `http://localhost:5173/`).

---
</br>
## Visualization Features (App.jsx)

The main visualization logic is housed in `/src/App.jsx`.

| Feature | Implementation | How to Test |
| :--- | :--- | :--- |
| **Model Asset** | Loaded from `/public/courts.glb`. | Ensure the model loads correctly in the browser. |
| **Third-Person View (TPV)** | Default scene orbit using OrbitControls. | Use the mouse to click and drag to orbit the camera around the outside of the court. |
| **First-Person View (FPV)** | Toggled via button. Implemented using custom camera controls (WASD logic) for navigation. | Click the **"ENTER First Person"** button, then use **WASD** to move and the mouse to look inside the court. |
| **Collision Detection** | Implemented using **Raycasting** on the camera object. | While in FPV mode, try walking the camera directly into a wall, pillar, or the stairs. Movement should stop immediately. |

---
</br>
## Modeling Overview (FINAL_CAMPUS_COURT.blend)

The source model was created in **Blender 5.0** and focused on accuracy, scale, and efficient geometry. The final output is an embedded **GLTF 2.0 (.glb)** file used by the web application.
</br>
### Key Modeling Principles

* **Scale and Units:** All modeling was conducted using the **Metric System** with a Unit Scale of 1.0 to guarantee real-world dimensions (e.g., 20cm rise / 30cm tread for stairs).
* **Modeling Efficiency:** Stairs and repeated structures were built efficiently using the **Array Modifier** and mirror modifiers.
* **Texture Management:** All external textures (wood, granite, brick) were **Packed** into the `FINAL_CAMPUS_COURT.blend` file using Blender's `File > External Data > Pack Resources` feature.
</br>
### Final Submission Files

| File | Location | Purpose |
| :--- | :--- | :--- |
| **Source Blender File** | `FINAL_CAMPUS_COURT.blend` | The full, editable source model. |
| **Web Model** | `public/courts.glb` | The optimized asset loaded by Three.js. |
| **Project Code** | `/src` and root config files | The functional React/Three.js application. |

---

