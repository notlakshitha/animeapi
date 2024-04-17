const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const port = process.env.PORT || 3000;


const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.status(200).send("OK"));

app.get("/get", async (req, res) => {
  try {
    const BASE_URL = "https://kawaiifu.com/";
    const kawaiilinks = BASE_URL;
    const linkreq = await axios.get(kawaiilinks);
    const linkkawa = linkreq.data;

    const $ = cheerio.load(linkkawa);

    const mostwatched = []; // Holds the most watched anime array

    const ongoing = [];

    const spring = [];

    const movies = [];

    const tvseries = [];

    const dub = [];

    const music = [];

    $(".list-film:first")
      .find(".item")
      .each((index, element) => {
        const name = $(element).find("a:eq(2)").text() || null;
        const jname = $(element).find("a:eq(1)").text() || null;
        const link = $(element).find("a").attr("href") || null;
        const view = $(element).find(".view").text().split('g:')[1].trim() || null;
        const image = $(element).find("img").attr("src") || null;
        const description = $(element).find(".cot1").text().trim() || null;
        const id = link.split(".com")[1];
        const release = $(element).find(".vl-chil-date:first").text() || null;
        const genre = $(element).find(".vl-chil-date:eq(1)").map((index, element)=>
           ( $(element).find("a").text())).get();
        const director = $(element).find(".vl-chil-date:eq(2)").text() || null;
        const rating = $(element).find(".fl-left").text().split('g:')[1].trim().split('(')[0].trim() || null;


        mostwatched.push({ name, jname, link, view, image, decrip,id,release , genre, director, rating});
      });

      $(".list-film:eq(1)")
      .find(".item")
      .each((index, element) => {
        const name = $(element).find("a:eq(2)").text() || null;
        const jname = $(element).find("a:eq(1)").text() || null;
        const link = $(element).find("a").attr("href") || null;
        const view = $(element).find(".view").text().split('g:')[1].trim() || null;
        const image = $(element).find("img").attr("src") || null;
        const decrip = $(element).find(".cot1").text().trim() || null;
        const id = link.split(".com")[1];
        const release = $(element).find(".vl-chil-date:first").text() || null;
        const genre = $(element).find(".vl-chil-date:eq(1)").map((index, element)=>
           ( $(element).find("a").text())).get();
        const director = $(element).find(".vl-chil-date:eq(2)").text() || null;
        const rating = $(element).find(".fl-left").text().split('g:')[1].trim().split('(')[0].trim() || null;



        ongoing.push({ name, jname, link, view, image, decrip,id,release , genre, director, rating});
      });

      $(".list-film:eq(2)")
      .find(".item")
      .each((index, element) => {
        const name = $(element).find("a:eq(2)").text() || null;
        const jname = $(element).find("a:eq(1)").text() || null;
        const link = $(element).find("a").attr("href") || null;
        const view = $(element).find(".view").text().split('g:')[1].trim() || null;
        const image = $(element).find("img").attr("src") || null;
        const decrip = $(element).find(".cot1").text().trim() || null;
        const id = link.split(".com")[1];
        const release = $(element).find(".vl-chil-date:first").text() || null;
        const genre = $(element).find(".vl-chil-date:eq(1)").map((index, element)=>
           ( $(element).find("a").text())).get();
        const director = $(element).find(".vl-chil-date:eq(2)").text() || null;
        const rating = $(element).find(".fl-left").text().split('g:')[1].trim().split('(')[0].trim() || null;



        spring.push({ name, jname, link, view, image, decrip,id,release , genre, director, rating});
      });

      $(".list-film:eq(3)")
      .find(".item")
      .each((index, element) => {
        const name = $(element).find("a:eq(2)").text() || null;
        const jname = $(element).find("a:eq(1)").text() || null;
        const link = $(element).find("a").attr("href") || null;
        const view = $(element).find(".view").text().split('g:')[1].trim() || null;
        const image = $(element).find("img").attr("src") || null;
        const decrip = $(element).find(".cot1").text().trim() || null;
        const id = link.split(".com")[1];
        const release = $(element).find(".vl-chil-date:first").text() || null;
        const genre = $(element).find(".vl-chil-date:eq(1)").map((index, element)=>
           ( $(element).find("a").text())).get();
        const director = $(element).find(".vl-chil-date:eq(2)").text() || null;
        const rating = $(element).find(".fl-left").text().split('g:')[1].trim().split('(')[0].trim() || null;



        movies.push({ name, jname, link, view, image, decrip,id,release , genre, director, rating});
      });

      $(".list-film:eq(4)")
      .find(".item")
      .each((index, element) => {
        const name = $(element).find("a:eq(2)").text() || null;
        const jname = $(element).find("a:eq(1)").text() || null;
        const link = $(element).find("a").attr("href") || null;
        const view = $(element).find(".view").text().split('g:')[1].trim() || null;
        const image = $(element).find("img").attr("src") || null;
        const decrip = $(element).find(".cot1").text().trim() || null;
        const id = link.split(".com")[1];
        const release = $(element).find(".vl-chil-date:first").text() || null;
        const genre = $(element).find(".vl-chil-date:eq(1)").map((index, element)=>
           ( $(element).find("a").text())).get();
        const director = $(element).find(".vl-chil-date:eq(2)").text() || null;
        const rating = $(element).find(".fl-left").text().split('g:')[1].trim().split('(')[0].trim() || null;



        tvseries.push({ name, jname, link, view, image, decrip,id,release , genre, director, rating});
      });

      $(".list-film:eq(5)")
      .find(".item")
      .each((index, element) => {
        const name = $(element).find("a:eq(2)").text() || null;
        const jname = $(element).find("a:eq(1)").text() || null;
        const link = $(element).find("a").attr("href") || null;
        const view = $(element).find(".view").text().split('g:')[1].trim() || null;
        const image = $(element).find("img").attr("src") || null;
        const decrip = $(element).find(".cot1").text().trim() || null;
        const id = link.split(".com")[1];
        const release = $(element).find(".vl-chil-date:first").text() || null;
        const genre = $(element).find(".vl-chil-date:eq(1)").map((index, element)=>
           ( $(element).find("a").text())).get();
        const director = $(element).find(".vl-chil-date:eq(2)").text() || null;
        const rating = $(element).find(".fl-left").text().split('g:')[1].trim().split('(')[0].trim() || null;



        dub.push({ name, jname, link, view, image, decrip,id,release , genre, director, rating});
      });

      $(".list-film:eq(6)")
      .find(".item")
      .each((index, element) => {
        const name = $(element).find("a:eq(2)").text() || null;
        const jname = $(element).find("a:eq(1)").text() || null;
        const link = $(element).find("a").attr("href") || null;
        const view = $(element).find(".view").text().split('g:')[1].trim() || null;
        const image = $(element).find("img").attr("src") || null;
        const decrip = $(element).find(".cot1").text().trim() || null;
        const id = link.split(".com")[1];
        const release = $(element).find(".vl-chil-date:first").text() || null;
        const genre = $(element).find(".vl-chil-date:eq(1)").map((index, element)=>
           ( $(element).find("a").text())).get();
        const director = $(element).find(".vl-chil-date:eq(2)").text() || null;
        const rating = $(element).find(".fl-left").text().split('g:')[1].trim().split('(')[0].trim() || null;



        music.push({ name, jname, link, view, image, decrip,id,release , genre, director, rating});
      });

    res.json({mostwatched,ongoing, spring, movies, tvseries, dub, music});
  } catch (e) {
    console.log("error: ", e);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
