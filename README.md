## Вставка книг в коллекцию 

```
await db.collection('books').insertMany([
  {
    title: 'Code Complete',
    description:
      'Features the best practices in the art and science of constructing software--topics include design, applying good techniques to construction, eliminating errors, planning, managing construction activities, and relating personal character to superior software. Original. (Intermediate)',
    authors: 'Steve McConnell',
  },
  {
    title: 'Война и мир',
    description:
      'Учебное пособие подготовлено в соответствии с государственным образовательным стандартом высшего профессионального образования по дисциплине «Информатика и математика». В соответствии с дидактическими блоками стандарта изложены основные разделы дискретной математики, теории вероятностей, математической статистики и основ информатики. Даны основные характеристики математических методов и моделей, используемых в праве, криминологии и судебной экспертизе. Для студентов и аспирантов юридических вузов и факультетов.',
    authors: 'Попов А.М.',
  },
  {
    title: 'Harry Potter and the Deathly Hallows',
    description:
      "It's no longer safe for Harry at Hogwarts, so he and his best friends, Ron and Hermione, are on the run. Professor Dumbledore has given them clues about what they need to do to defeat the dark wizard, Lord Voldemort, once and for all, but it's up to them to figure out what these hints and suggestions really mean...",
    authors: 'J. K. Rowling',
  },
]);
```

## Поиск книг по названию 

```
await db.collection('books').find({
  title: 'Code Complete',
});
```

## Редактирование полей

```
await db.collection('books').updateOne(
  { _id: '507f191e810c19729de860e6' },
  {
    $set: {
      description: "It's no longer safe for Harry at Hogwarts...",
      authors: 'Rowling J. K.',
    },
  }
);
```