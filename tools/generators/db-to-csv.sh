CONNECTION="postgresql://dev:dev@localhost:5432"

psql -d $CONNECTION -Atc "select tablename from pg_tables where schemaname='public'" |\
  while read TBL; do
    psql -d $CONNECTION -c "\copy (select * from $TBL) to '../seed-data/$TBL.csv' with (FORMAT CSV, HEADER);"
  done