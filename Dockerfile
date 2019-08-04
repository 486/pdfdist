FROM gcr.io/cloud-marketplace/google/centos7@sha256:f81f0303a39d7b986a2ebbff86f97486d20ec44f2ce638475c21e3f6b3d2b855
RUN yum -y localinstall https://www.linuxglobal.com/static/blog/pdftk-2.02-1.el7.x86_64.rpm
RUN yum -y install ImageMagick-6.7.8.9
RUN curl https://nodejs.org/dist/v10.16.0/node-v10.16.0-linux-x64.tar.xz | tar --strip-components 1 -xJv -C /usr/local
RUN pdftk --version \
    && convert -version \
    && node -v \
    && npm -v 
COPY . /opt/app/
WORKDIR /opt/app
ENV NODE_ENV=production
RUN npm install 
CMD ["/usr/local/bin/node", "."]
EXPOSE 8080