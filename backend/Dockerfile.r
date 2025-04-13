FROM r-base:4.3.2

# Install dependencies
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    libgl1-mesa-dev \
    libglu1-mesa-dev \
    libx11-dev \
    libxt-dev \
    libfreetype6-dev \
    pandoc \
    && apt-get clean

# Install required R packages
RUN R -e "install.packages(c('ggplot2', 'plotly', 'htmlwidgets', 'rgl'), repos='http://cran.rstudio.com/')"

WORKDIR /app

CMD ["Rscript", "/app/script.r"]
