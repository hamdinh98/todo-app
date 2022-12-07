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
}