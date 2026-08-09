# CS4732 Computer Animation - Final Project <br> The Animation Museum

Max Allen, Ellie Kim, and Jeremy King

This project is a small museum that the visiter can explore using standard first-person controls: WASD to move and mouse to look. Clicking on the canvas will lock the cursor. There are four exhibits to look at: A fish tank, a roller coaster, a Newton's Cradle, and a robotic arm. Each exhibit represents implementaitons of different topics in computer animation.

## Topics

Each exhibit covers a few animation technologies. Here is a list of the technologies each exhibit covers:

- Aquarium
  - Particle systems - Many fish are simulated as particles
  - Obstacle avoidance - The fish avoid each other and a treasure chest
- Robot Arm
  - Skeletal animation - It is a single mesh with skeletal animation
  - Shape deformation - The skeletal deformation is a type of shape deformation
  - Inverse kinematics - It uses inverse kinematics to trace the shape of a circle
- Rollercoaster
  - Splines - The rollercoaster path is a spline
  - Hierarchical modeling - The car's wheels are attached to the body
  - Quaternions - The car's rotation is controlled by quaternions
  - Slerping - The car's rotation uses slerp to rotate to follow the curve
- Newton's Cradle
  - Physically-based animation - It uses conservation of energy and newtonian physics to determine the speed and position of the balls on the ends

## Extra Technologies

### WebGL 2 and VAOs

WebGL 2 is the graphics engine we used for this project. We chose to use WebGL 2 instead of WebGL 1 because it natively supports Vertex Array Objects which improve the speed of the render loop by caching information about vertex attribute pointers on the GPU.

## Build and Run

No server is required for this project to run. Extract or clone the project into an empty folder and open `final-project.html` in a browser to run the project.

## Instructions and Controls

The project can be interacted with using standard first person controls:

- **WASD** - Move
- **Mouse** - Look

Click on the canvas to lock the cursor and press `esc` to unlock it.

## Challenges

We decided to use Vertex Array Objects, which were not something we learned in class but a feature of WebGL that we wanted to try out to optimize our buffers and layouts.
This became especially useful with the creation of multiple separate exhibits created in different files by different people, but also posed some challenges with setting default attributes and overwriting them properly. Setting an attribute via `vertexAttrib[1234]f[v]()` is not saved in the VAO so we would need to use Uniform Buffer Objects (UBOs) in order to make objects completely separate and more efficient. We decided that UBOs was too much for this project, but the VAOs were still helpful.

We also faced some difficulties with file parsing. Initially we were using `fetch()` to load the spline file for the rollercoaster from a separate file, but this didn't work if one just ran the HTML file without a development server. To fix this we implemented the spline file as a large string variable in the javascript for the rollercoaster exhibit.

## Responsibilities

- **Max Allen**
  - Phong Shader
  - User Input
  - Newton's Cradle
  - Robot Arm IK
- **Ellie Kim**
  - Aquarium
- **Jeremy King**
  - Rollercoaster

## AI Usage

AI was used to occasionally help identify bugs and provide avenues of investigation for debugging. No code was generated purely by AI.

## External References

We referenced documentation and online resources like webglfundamentals.org and MDN Web Docs.