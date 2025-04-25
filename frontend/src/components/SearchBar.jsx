"use client"

import { useState } from "react"
import {
  Paper,
  InputBase,
  IconButton,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Search as SearchIcon, FilterList } from "@mui/icons-material"

const SearchBar = ({ value, onChange, onSearch, categories = [], onFilterChange }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: "",
    status: "",
  })

  const handleFilterChange = (event) => {
    const { name, value } = event.target
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    if (onFilterChange) {
      onFilterChange(newFilters)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(value, filters)
    }
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", mb: 4 }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={2}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          borderRadius: 3,
          mb: showFilters ? 2 : 0,
        }}
      >
        <InputBase
          sx={{ ml: 3, flex: 1 }}
          placeholder="Buscar itens..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          inputProps={{ "aria-label": "buscar itens" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="filtros" onClick={() => setShowFilters(!showFilters)}>
          <FilterList />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="buscar">
          <SearchIcon />
        </IconButton>
      </Paper>

      {showFilters && (
        <Paper
          elevation={2}
          sx={{
            p: 2,
            borderRadius: 3,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
          }}
        >
          <FormControl fullWidth={isMobile} sx={{ minWidth: 150 }}>
            <InputLabel id="category-label">Categoria</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              name="category"
              value={filters.category}
              label="Categoria"
              onChange={handleFilterChange}
              size="small"
            >
              <MenuItem value="">Todas</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth={isMobile} sx={{ minWidth: 150 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status-select"
              name="status"
              value={filters.status}
              label="Status"
              onChange={handleFilterChange}
              size="small"
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="PERDIDO">Perdido</MenuItem>
              <MenuItem value="ENCONTRADO">Encontrado</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      )}
    </Box>
  )
}

export default SearchBar
