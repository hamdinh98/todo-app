<?php

namespace App\Repository;

use Doctrine\ODM\MongoDB\Repository\DocumentRepository;

class TaskRepository extends DocumentRepository
{
   public function fetchAndSortByOrder(string $sort, string $order):array
   {
       return $this->createQueryBuilder()
            ->sort($sort,$order)
            ->getQuery()
            ->execute()
            ->toArray();
   }
   public function nbOfTodosInTotal():array
   {
       $nbTodo =  count($this->createAggregationBuilder()
           ->match()
           ->field('status')
           ->equals('todo')
           ->execute()
           ->toArray());
       $nbTotal = count($this->createAggregationBuilder()
           ->match()
           ->execute()
           ->toArray());
       return ['nbTodo'=>$nbTodo,'nbTotal'=>$nbTotal];
   }
}