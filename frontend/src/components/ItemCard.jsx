import { useState, useContext } from "react"
  import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Chip,
    Button,
    CardActions,
    IconButton,
    Tooltip,
  } from "@mui/material"
  import { LocationOn, Phone, CalendarToday, Category, SwapHoriz } from "@mui/icons-material"
  import { Link, useNavigate } from "react-router-dom"
  import { formatDate } from "../utils/formatters"
  import { updateItem } from "../services/itemService"
  import { AuthContext } from "../context/AuthContext"

  import imageDefault from "../public/image-default.png"

  const ItemCard = ({ item, showQuickStatusChange = false }) => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [currentStatus, setCurrentStatus] = useState(item.status)

    const statusColor = currentStatus === "PERDIDO" ? "error" : "success"
    const statusLabel = currentStatus === "PERDIDO" ? "Perdido" : "Encontrado"

    const isOwner =
      user && item && (user.id === item.usuarioId || (item.user && user.id === item.user.id) || user.role === "ADMIN")

    const handleQuickStatusChange = async () => {
      if (!isOwner) return

      try {
        setLoading(true)
        const newStatus = currentStatus === "PERDIDO" ? "ENCONTRADO" : "PERDIDO"

        await updateItem(item.id, { status: newStatus })
        setCurrentStatus(newStatus)
      } catch (error) {
        console.error("Erro ao atualizar status:", error)
      } finally {
        setLoading(false)
      }
    }

    return (
      <Card
        elevation={2}

        sx={{
         height: 640,
          width: 350,
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          },
          position: "relative",
          overflow: "hidden"
        }}
      >
        {showQuickStatusChange && isOwner && (
          <Tooltip title={`Marcar como ${currentStatus === "PERDIDO" ? "Encontrado" : "Perdido"}`}>
            <IconButton
              size="small"
              color={currentStatus === "PERDIDO" ? "success" : "error"}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 2,
                bgcolor: "rgba(255,255,255,0.9)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,1)",
                },
              }}
              onClick={handleQuickStatusChange}
              disabled={loading}
            >
              <SwapHoriz />
            </IconButton>
          </Tooltip>
        )}

        <CardMedia
          component="img"
          height="300"
          width="100%"
          image={item.foto || imageDefault}
          alt={item.nome}
          sx={{ objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null; // Evita loop infinito
            e.target.src = imageDefault; // Substitui pela imagem padrão
          }}
        />

        <CardContent sx={{ flexGrow: 1,overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom  sx={{
              mr: 8,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}>
              {item.nome}
            </Typography>
            <Chip label={statusLabel} color={statusColor} size="small" sx={{ fontWeight: "bold" }} />
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {item.descricao}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocationOn fontSize="small" color="action" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{
            
        display: "-webkit-box",
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 1,
      }}>
              {item.localizacao}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <CalendarToday fontSize="small" color="action" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {formatDate(item.data)}
            </Typography>
          </Box>

          {item.categoria && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Category fontSize="small" color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {item.categoria.name}
              </Typography>
            </Box>
          )}

          {item.user && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Phone fontSize="small" color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {item.user.phone}
              </Typography>
            </Box>
          )}
        </CardContent>

        <CardActions>
          <Button component={Link} to={`/item/${item.id}`} size="small" color="primary" fullWidth>
            Ver Detalhes
          </Button>
        </CardActions>
      </Card>
    )
  }

  export default ItemCard
