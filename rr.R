
#!/usr/bin/Rscript


arg <- commandArgs(trailingOnly=T)

x <- paste('cd yad3ad-components; git add --all; git commit -m \'', 
           as.character(arg[1]),'\'; git push; cd ../; git add --all; git commit -m \'', 
           as.character(arg[2]),'\'; git push',
           '\n',
           sep="")

system(x)