#!/usr/bin/Rscript


arg <- commandArgs(trailingOnly=T)

system(paste('git add --all; git commit -m \'', 
              as.character(arg),
             '\'; git push --recurse-submodules=on-demand', 
             '\n',
             sep="" ))
