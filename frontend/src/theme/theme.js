import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#2d6a4f",
      light: "#4b8a6f",
      dark: "#1b4332",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#3498db",
      light: "#5aafed",
      dark: "#2980b9",
      contrastText: "#ffffff",
    },
    error: {
      main: "#e74c3c",
      light: "#f55a4e",
      dark: "#c0392b",
    },
    warning: {
      main: "#f39c12",
      light: "#f5b041",
      dark: "#d35400",
    },
    info: {
      main: "#3498db",
      light: "#5dade2",
      dark: "#2980b9",
    },
    success: {
      main: "#2ecc71",
      light: "#58d68d",
      dark: "#27ae60",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#2c3e50",
      secondary: "#7f8c8d",
      disabled: "#bdc3c7",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 20px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          },
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#1b4332",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
})

export default theme
