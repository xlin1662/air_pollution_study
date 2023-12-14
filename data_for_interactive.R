# Run this script to get the data required for interactive graph (printed in console).


library(ggplot2)
library(dplyr)

df <- read.csv("selected_data.csv")

df <- df %>%
  group_by(ParentLocation, Period) %>%
  mutate(YearlyContE = mean(FactValueNumeric)) %>%
  ungroup()
df <- distinct(df[,c("Period","YearlyContE","ParentLocation")])


func <- function(x, y) {
  return(paste("{x:",as.character(x),",y:",as.character(y),"}"))
}

df_to_coords <- function(data){
  coord_pairs <- Map(func, data$Period, data$YearlyContE)
  res <- "["
  for (coord in coord_pairs){
    res = paste(res, coord, ",")
  }
  res <- paste(res,"]")
  res
}

df_to_coords(df[df$ParentLocation=="Africa",])
df_to_coords(df[df$ParentLocation=="Americas",])
df_to_coords(df[df$ParentLocation=="Europe",])
df_to_coords(df[df$ParentLocation=="Eastern Mediterranean",])
df_to_coords(df[df$ParentLocation=="South-East Asia",])
df_to_coords(df[df$ParentLocation=="Western Pacific",])


