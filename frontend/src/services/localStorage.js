const LOCAL_STORAGE_KEY = "visucode_user_code";

const getPlaceholderCode = (language) => {
  if (language === "python") {
    return `# Python visualization code example
  import matplotlib.pyplot as plt
  import numpy as np
  
  # Generate some data
  x = np.linspace(0, 10, 100)
  y = np.sin(x)
  
  # Create a simple plot
  plt.figure(figsize=(10, 6))
  plt.plot(x, y, label='sin(x)')
  plt.title('Sine Wave')
  plt.xlabel('x')
  plt.ylabel('sin(x)')
  plt.grid(True)
  plt.legend()
  
  # Display the plot
  plt.tight_layout()
  plt.show()`;
  } else {
    return `# R visualization code example
  # Create some data
  x <- seq(0, 10, length.out = 100)
  y <- sin(x)
  
  # Create a simple plot
  plot(x, y, type = "l", col = "blue", 
     main = "Sine Wave", 
     xlab = "x", 
     ylab = "sin(x)")
  grid()`;
  }
};

export const getSavedCode = (language) => {
  const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
  return saved[language] || getPlaceholderCode(language);
};

export const saveCode = (language, code) => {
  const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
  saved[language] = code;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saved));
};
