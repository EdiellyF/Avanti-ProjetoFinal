import { Box, Container, CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import theme from "../theme/theme"
import ToolBarFindy from "./ToolBarFindy"
import FooterFindy from "./FooterFindy"

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <ToolBarFindy />
        <Container
          component="main"
          sx={{
            flexGrow: 1,
            py: 4,
            mt: { xs: 7, sm: 8 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Container>
        <FooterFindy />
      </Box>
    </ThemeProvider>
  )
}

export default Layout
