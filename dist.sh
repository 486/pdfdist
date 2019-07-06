secret=iv26LwzHkdsmaCzPPW7ejTts
mkdir -p output
for filename in *.pdf; do
    convert -density 300 -quality 80 -compress jpeg "$filename" - | pdftk - output "output/$filename" owner_pw "$secret" allow printing
done
