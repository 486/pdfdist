# "flatten" all pdfs in the workdir and write the result to output/
secret=$(openssl rand -base64 16)
mkdir -p output
for filename in *.pdf; do
    convert -density 300 -quality 80 -compress jpeg "$filename" - | pdftk - output "output/$filename" owner_pw "$secret" allow printing
done
