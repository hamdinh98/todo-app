<?php

namespace App\resolver;
use App\Document\Task;
use App\DTO\TodosIds;
use App\Repository\TaskRepository;
use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;
use Doctrine\ODM\MongoDB\MongoDBException;


class TodoResolver
{
    private TaskRepository $taskRepo;

    public function __construct(ManagerRegistry  $managerRegistry)
    {
        $this->taskRepo = $managerRegistry->getRepository(Task::class);
    }

    /**
     * @throws MongoDBException
     */
    public function create(Task $todo):void
    {
        $this->taskRepo->getDocumentManager()->persist($todo);
        $this->taskRepo->getDocumentManager()->flush();
    }

    /**
     * @throws MongoDBException
     */
    public function delete(array $todosId):void
    {
        $todos = $this->taskRepo->findBy(['_id'=>['$in'=>$todosId]]);
        foreach ($todos as $todo)
        {
          $this->taskRepo->getDocumentManager()->remove($todo);
        }
        $this->taskRepo->getDocumentManager()->flush();
    }
    public function findAll(string $sort, string $order):array
    {
           return $this->taskRepo->fetchAndSortByOrder($sort,$order);
    }

    public function findById(string $id):Task
    {
        //dd($id);
        return $this->taskRepo->findOneBy(['_id'=>$id]);
    }
    public function filterStatus(string $status):array
    {
        return $this->taskRepo->findBy(['status'=>$status]);
    }

    public function nbOfTodosInTotal():array
    {
        return $this->taskRepo->nbOfTodosInTotal();
    }
}