FROM amazoncorretto:19-al2-jdk as build

WORKDIR /app

COPY mvnw .

COPY .mvn .mvn

COPY src/main/java/pom.xml .

RUN ./mvnw dependency:go-offline -B

COPY src src

RUN chmod +x mvnw

RUN ./mvnw package -DskipTests

RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM amazoncorretto:19-al2-jdk

ARG DEPENDENCY=/app/target/dependency

COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

ENTRYPOINT ["java","-cp","app:app/lib/*","com.example.Ecom.EcomApplication"]