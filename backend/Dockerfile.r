FROM r-base
RUN R -e "install.packages(c('ggplot2', 'plotly', 'rgl'), repos='http://cran.rstudio.com/')"
WORKDIR /app
CMD ["Rscript", "/app/script.r"]